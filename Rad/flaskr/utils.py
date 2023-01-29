def basic_search_attribute_parse(search_params):
    params = []
    # If search is basic or logic is used in comparing attributes
    or_attributes = {"emocije": [], "opis": [], "sudionik": []}
    rest_attributes = {}

    for key in search_params:
        # Collect all attributes for later PDF output
        params.append(f"{key}: {search_params[key]} // ")

        # If attribute keys are for or logic comparison store their values in a dictionary as a list
        if "emocija" in key:
            or_attributes["emocije"].append(key)
        elif "sudionik" in key and key is not "zamjena_sudionika":
            or_attributes["sudionik"].append(key)
        elif "opis" in key:
            or_attributes["opis"].append(key)
        else:
            rest_attributes[key] = search_params[key]

    return params, or_attributes, rest_attributes


def advanced_search_attribute_parse(search_params):
    params = []
    rest_attributes = {}
    # Collect all attributes
    for key in search_params:
        params.append(f"{key}: {search_params[key]} // ")
        rest_attributes[key] = search_params[key]

    return params, rest_attributes


def _is_search_string_match(search_string, element):

    return (
        search_string.lower() in element.invocation_elements.greeting.lower()
        or search_string.lower() in element.exvocation_elements.greeting.lower()
        or search_string.lower() in element.invocation_elements.response.lower()
        or search_string.lower() in element.exvocation_elements.response.lower()
    )
