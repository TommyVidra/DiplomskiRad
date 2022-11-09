import csv
from urllib import response
import xml.etree.ElementTree as ET
from xml.dom import minidom

INVOCATION_TAG = "invokacija"
EXVOCATION_TAG = "eksvokacija"
INVOCATION_GREETING_TAG = "invokacijski_pozdrav"
INVOCATION_RESPONSE_TAG = "invokacijski_odzdrav"
EXVOCATION_GREETING_TAG = "eksvokacijski_pozdrav"
EXVOCATION_RESPONSE_TAG = "eksvokacijski_odzdrav"

class DictionaryModel:

    # Situation is an xml element from root
    def __init__(self, situation):
        self.attributes = {}
        self.situation = situation
        self.invocations, self.exvocations = self.return_invocations_exvocations()
        
        self.invocation_greetings, self.invocation_responses = self.return_invocation_elements()
        self.exvocation_greetings, self.exvocation_responses = self.return_exvocation_elements()

        self.keys = set(self.attributes.keys())

    def return_invocations_exvocations(self):

        for key in self.situation.attrib.keys():
            if key != "entryID":
                self.attributes[key] = self.situation.attrib[key]

        if not (self.situation.find(INVOCATION_TAG)):
            invocations = None
        else:
            invocations= self.situation.findall(INVOCATION_TAG)
            for invocation in invocations:
                for key in invocation.attrib.keys():
                    self.attributes[key] = invocation.attrib[key]
            
        if not (self.situation.find(EXVOCATION_TAG)):
            exvocations = None
        else:
            exvocations =  self.situation.findall(EXVOCATION_TAG)
            for exvocation in exvocations:
                for key in exvocation.attrib.keys():
                    self.attributes[key] = exvocation.attrib[key]

        return invocations, exvocations
        
    def return_invocation_elements(self):
        greetings = []
        responses = []
        if self.invocations is not None:
            for invocation in self.invocations:
                for invocation_element in invocation:
                # Nije dobro jer su tu jos pozdravi/odzdravi
                    for element in invocation_element:
                        for key in element.attrib.keys():
                            self.attributes[key] = element.attrib[key]
                    if invocation_element.tag == INVOCATION_GREETING_TAG:
                        greetings.append(invocation)
                    else:
                        responses.append(invocation)
        return greetings, responses

    def return_exvocation_elements(self):
        greetings = []
        responses = []
        if self.exvocations is not None:
            for exvocation in self.exvocations:
                for exvocation_element in exvocation:
                    for element in exvocation_element:
                        for key in element.attrib.keys():
                            self.attributes[key] = element.attrib[key]
                    if exvocation_element.tag == EXVOCATION_GREETING_TAG:
                        greetings.append(exvocation)
                    else:
                        responses.append(exvocation)
        return greetings, responses

f = open("pozz-odzz.xml", "r", encoding='utf-8')
tree = ET.parse(f)
root = tree.getroot()
dictionaryModelList = []

for child in root:
    if len(child) > 0:
        dictionaryModelList.append(DictionaryModel(child))

dicts = {}
keys = set()
for model in dictionaryModelList:
    keys.update(model.keys)

for model in dictionaryModelList:
    for key in keys:
        try:
            if key in model.keys:
                if key == "opis_epn":
                    ...
                    # print(model.attributes[key])
                if model.attributes[key] is not None:
                    if key not in dicts.keys():
                        dicts[key] = {model.attributes[key]}
                    else: 
                        tmp = dicts[key]
                        tmp.add(model.attributes[key])
                        dicts[key] = tmp
        except Exception as e:
            # print(key)
            ...
print(dicts["autor_upisa"])