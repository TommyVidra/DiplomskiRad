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


def return_all_matched_scenarios(
    data,
    search_string,
    is_basic,
    or_attributes,
    rest_attributes,
    search_params,
    search_scene,
):
    ...
    # _matched_data = []
    # _current_params = []

    # for key in data:
    #         match = True

    #         if (_is_search_string_match(search_string, key)):

    #             if is_basic:
    #                 for attribute_section in or_attributes:
    #                     if len(or_attributes[attribute_section]) > 1:
    #                         or_match = False
    #                         value = search_params[or_attributes[attribute_section][0]]
    #                         for attribute in or_attributes[attribute_section]:
    #                             if attribute in key.attributes.keys():
    #                                 if value in key.attributes[attribute]:
    #                                     or_match = True
    #                                     break
    #                         if not or_match:
    #                             match = False
    #                             break

    #             if match:
    #                 # If search is not basic
    #                 for search_attribute in rest_attributes:
    #                     try:
    #                         if (
    #                             search_params[search_attribute]
    #                             not in key.attributes[search_attribute]
    #                         ):
    #                             match = False
    #                             break
    #                     except KeyError:
    #                         match = False

    #             invocation_match = (
    #                 search_string.lower() in key.invocation_elements.response.lower()
    #                 or search_string.lower() in key.invocation_elements.greeting.lower()
    #             )
    #             exvocation_match = (
    #                 search_string.lower() in key.exvocation_elements.response.lower()
    #                 or search_string.lower() in key.exvocation_elements.greeting.lower()
    #             )
    #             if not is_basic and search_scene is not None:
    #                 if (
    #                     search_scene == "inv-exv"
    #                     and invocation_match == False
    #                     and exvocation_match == False
    #                 ):
    #                     match = False
    #                 elif (search_scene == "inv" and invocation_match == False) or (
    #                     search_scene == "exv" and exvocation_match == False
    #                 ):
    #                     match = False

    #             if invocation_match:
    #                 if (
    #                     search_string.lower()
    #                     in key.invocation_elements.greeting.lower()
    #                 ):
    #                     first_match = key.invocation_elements.greeting
    #                 elif (
    #                     search_string.lower()
    #                     in key.invocation_elements.response.lower()
    #                 ):
    #                     first_match = key.invocation_elements.response
    #             elif exvocation_match:
    #                 if (
    #                     search_string.lower()
    #                     in key.exvocation_elements.greeting.lower()
    #                 ):
    #                     first_match = key.exvocation_elements.greeting
    #                 elif (
    #                     search_string.lower()
    #                     in key.exvocation_elements.response.lower()
    #                 ):
    #                     first_match = key.exvocation_elements.response

    #             if match:
    #                 dict = {
    #                     "inv_greeting": key.invocation_elements.greeting,
    #                     "inv_response": key.invocation_elements.response,
    #                     "exv_greeting": key.exvocation_elements.greeting,
    #                     "exv_response": key.exvocation_elements.response,
    #                     "attrs": json.dumps(
    #                         list(key.attributes.items()), ensure_ascii=False
    #                     ),
    #                     "exvocation_match": exvocation_match,
    #                     "invocation_match": invocation_match,
    #                     "first_match": first_match,
    #                 }
    #                 _DATA_USED.append(dict)
    #                 results.append(dict)
    #                 index += 1
    #     DATA_USED = _DATA_USED
    #     CURRENT_PARAMS = _CURRENT_PARAMS
