import os
from urllib import response
import xml.etree.ElementTree as ET
from xml.dom import minidom
from .config import (
    INVOCATION_GREETING_TAG,
    INVOCATION_RESPONSE_TAG,
    EXVOCATION_TAG,
    INVOCATION_TAG,
    EXVOCATION_RESPONSE_TAG,
    EXVOCATION_GREETING_TAG,
    XML_DICTIONARY_FILE_NAME,
    DEFAULT_UNKNOWN_VALUE,
    EMPTY_STRING,
    EMPTY_STRING_WHITESPACE,
    DEFAULT_EMPTY_VALUE,
    DEFAULT_EMPTY_SYMBOL,
)

# Method for returning if value is useable
def is_valuable(value):
    return (
        value == EMPTY_STRING
        or value == EMPTY_STRING_WHITESPACE
        or value == DEFAULT_EMPTY_SYMBOL
        or value == DEFAULT_EMPTY_VALUE
        or value is None
    )


class ElementModel:
    """Class representing a situation dialog"""

    def __init__(self, elements):
        """Initialize all attributes of the class.

        Args:
            elements (xml_element): Representation of invocation or exvocation dialog
        """

        # Set default values of dialog attributes
        self.attributes = {}
        self.greeting = DEFAULT_UNKNOWN_VALUE
        self.response = DEFAULT_UNKNOWN_VALUE

        if elements is not None:
            for element in elements:
                for subelements in element:
                    for subelement in subelements:
                        for key in subelement.attrib.keys():
                            self.attributes[key] = subelement.attrib[key]
                        if (
                            subelement.tag == INVOCATION_GREETING_TAG
                            or subelement.tag == EXVOCATION_GREETING_TAG
                        ):
                            self.greeting = subelement.text
                        elif (
                            subelement.tag == INVOCATION_RESPONSE_TAG
                            or subelement.tag == EXVOCATION_RESPONSE_TAG
                        ):
                            self.response = subelement.text

        # If attributes are not valuable store them in dictionary with generic default empty value
        for attribute_key in self.attributes:

            if is_valuable(self.attributes[attribute_key]):
                self.attributes[attribute_key] = DEFAULT_UNKNOWN_VALUE

        if is_valuable(self.greeting):
            self.greeting = DEFAULT_UNKNOWN_VALUE

        if is_valuable(self.response):
            self.response = DEFAULT_UNKNOWN_VALUE


class SituationModel:
    """Class representing a situation with multiple dialogs

    Situation is an xml element from root
    """

    def __init__(self, situation):
        """Initialize all SituationModel attributes and collect them all from dialogs

        Args:
            situation (xml_element): Situation element from xml file
        """
        self.attributes = {}
        self.situation = situation
        self.invocations, self.exvocations = self.return_invocations_exvocations()

        self.invocation_elements = ElementModel(self.invocations)
        self.exvocation_elements = ElementModel(self.exvocations)

        # Store all attribute key to one dictionary
        self.keys = set(self.attributes.keys())
        self.keys.update(self.invocation_elements.attributes.keys())
        self.keys.update(self.exvocation_elements.attributes.keys())
        self.attributes.update(self.invocation_elements.attributes)
        self.attributes.update(self.exvocation_elements.attributes)

    def return_invocations_exvocations(self):
        """Extract and return all invocation and exvocation dialogs

        Returns:
            xml_element: invocation and exvocation elements
        """

        for key in self.situation.attrib.keys():
            self.attributes[key] = self.situation.attrib[key]

        if not (self.situation.find(INVOCATION_TAG)):
            invocations = None

        else:
            invocations = self.situation.findall(INVOCATION_TAG)

            for invocation in invocations:
                for key in invocation.attrib.keys():
                    self.attributes[key] = invocation.attrib[key]

        if not (self.situation.find(EXVOCATION_TAG)):
            exvocations = None

        else:
            exvocations = self.situation.findall(EXVOCATION_TAG)
            for exvocation in exvocations:
                for key in exvocation.attrib.keys():
                    self.attributes[key] = exvocation.attrib[key]

        return invocations, exvocations


def open_file_fill_dictionary(file):
    """Open dictionary xml file and return parsed data

    Args:
        file (string): Path to dictionary file

    Returns:
        List: List with all parsed situations from the dictionary
    """

    f = open(file, "r", encoding="utf-8")
    tree = ET.parse(f)
    root = tree.getroot()
    dictionary_model_list = []

    for child in root:

        if len(child) > 0:
            dictionary_model_list.append(SituationModel(child))

    return dictionary_model_list


def return_attributes(dictionary_model_list):
    """Return key set from all collected attributes.

    Args:
        dictionary_model_list (Dictionary): Dictionary with all collected attributes.

    Returns:
        Set: Set of attribute keys.
    """

    keys = set()
    for model in dictionary_model_list:
        keys.update(model.keys)

    return keys


def return_entries():
    """Return all scenarios from the dictionary xml file.

    Returns:
        List: List with dictionaries representing all scenarios.
    """

    script_path = os.path.dirname(os.path.abspath(__file__))
    xml_dictionary_path = os.path.join(script_path, XML_DICTIONARY_FILE_NAME)
    dictionary_model_list = open_file_fill_dictionary(xml_dictionary_path)
    return dictionary_model_list


def main():
    """Collect all attributes and return them

    Returns:
        Set: Set of keys from all collected attributes.
    """

    attributes_dictionary = return_attributes(return_entries())
    return attributes_dictionary
