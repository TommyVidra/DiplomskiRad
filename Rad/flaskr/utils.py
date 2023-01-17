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
