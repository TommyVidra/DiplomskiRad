#################################
# App starting procedure in cmd #
#################################

# cmd
# set FLASK_APP=flaskr
# set FLASK_ENV=development
# flask run

import os
import json
from flask import Flask, render_template, request, send_file, redirect, url_for
from fpdf import FPDF
from .xml_reader import main, return_entries
from .config import KOMB_DICTIONARY
from .utils import basic_search_attribute_parse, advanced_search_attribute_parse

# Variables used for outputting PDF files
_DATA = xml_reader.return_entries()
DATA_USED = []
CURRENT_SEARCH = None
CURRENT_PARAMS = None

# Class used to create json from dictionaries containing sets.
class SetEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, set):
            return list(obj)
        return json.JSONEncoder.default(self, obj)


def create_app(test_config=None):
    """Create flask app and it's routes.

    Returns:
        Object: Flask app created.
    """

    script_path = os.path.dirname(os.path.abspath(__file__))
    templates_path = os.path.join(script_path, "templates")
    app = Flask(__name__, template_folder=templates_path, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY="dev", DATABASE=os.path.join(app.instance_path, "flaskr.sqlite")
    )

    # Load instance from config file if exists
    if test_config is None:
        app.config.from_pyfile("config.py", silent=True)
    # Load test config if passed
    else:
        app.config.from_mapping(test_config)

    # Ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    ####################
    #### Web routes ####
    ####################

    # Route for returning set of keys from all attributes as json object
    @app.route("/dict", methods=["GET"])
    def return_dict():
        try:
            dictionary_attributes = set(xml_reader.main())
            json_dictionary_attributes = json.dumps(
                dictionary_attributes,
                cls=SetEncoder,
                sort_keys=True,
                ensure_ascii=False,
            )
            return json_dictionary_attributes
        except Exception as e:
            return error_(e)

    # Receive search parameters and return situations matching with those parameters
    @app.route("/search", methods=["POST"])
    def return_search_data():
        try:
            global DATA_USED
            global CURRENT_SEARCH
            global CURRENT_PARAMS

            _CURRENT_PARAMS = []
            _DATA_USED = []

            # String phrase inputted
            search_string = request.form["search_string"]
            # Parameters inputted in search
            search_params = json.loads(request.form["search_params"], encoding="utf-8")
            # Search type, basic or advanced
            search_type = request.form["search_type"]
            basic = False

            CURRENT_SEARCH = search_string

            if search_type == "0":
                basic = True

            # If search is basic or logic is used in comparing attributes
            or_attributes = {"emocije": [], "opis": [], "sudionik": []}
            rest_attributes = {}
            search_scene = None

            try:
                # Search dialog attribute (invocation and exvocation | invocation | exvocation)
                search_scene = search_params["search_scene"]
                del search_params["search_scene"]
            except Exception:
                print("It is a basic search")

            if basic:
                (
                    _CURRENT_PARAMS,
                    or_attributes,
                    rest_attributes,
                ) = basic_search_attribute_parse(search_params)
            else:
                _CURRENT_PARAMS, rest_attributes = advanced_search_attribute_parse(
                    search_params
                )

            results = []
            index = 0

            for key in _DATA:
                match = True

                if (
                    search_string.lower() in key.invocation_elements.greeting.lower()
                    or search_string.lower() in key.exvocation_elements.greeting.lower()
                    or search_string.lower() in key.invocation_elements.response.lower()
                    or search_string.lower() in key.exvocation_elements.response.lower()
                ):

                    if basic:
                        for attribute_section in or_attributes:
                            if len(or_attributes[attribute_section]) > 1:
                                or_match = False
                                value = search_params[
                                    or_attributes[attribute_section][0]
                                ]
                                for attribute in or_attributes[attribute_section]:
                                    if attribute in key.attributes.keys():
                                        if value in key.attributes[attribute]:
                                            or_match = True
                                            break
                                if not or_match:
                                    match = False
                                    break

                    if match:
                        # If search is not basic
                        for search_attribute in rest_attributes:
                            try:
                                if (
                                    search_params[search_attribute]
                                    not in key.attributes[search_attribute]
                                ):
                                    match = False
                                    break
                            except KeyError:
                                match = False

                    invocation_match = (
                        search_string.lower()
                        in key.invocation_elements.response.lower()
                        or search_string.lower()
                        in key.invocation_elements.greeting.lower()
                    )
                    exvocation_match = (
                        search_string.lower()
                        in key.exvocation_elements.response.lower()
                        or search_string.lower()
                        in key.exvocation_elements.greeting.lower()
                    )
                    if not basic and search_scene is not None:
                        if (
                            search_scene == "inv-exv"
                            and invocation_match == False
                            and exvocation_match == False
                        ):
                            match = False
                        elif (search_scene == "inv" and invocation_match == False) or (
                            search_scene == "exv" and exvocation_match == False
                        ):
                            match = False

                    if invocation_match:
                        if (
                            search_string.lower()
                            in key.invocation_elements.greeting.lower()
                        ):
                            first_match = key.invocation_elements.greeting
                        elif (
                            search_string.lower()
                            in key.invocation_elements.response.lower()
                        ):
                            first_match = key.invocation_elements.response
                    elif exvocation_match:
                        if (
                            search_string.lower()
                            in key.exvocation_elements.greeting.lower()
                        ):
                            first_match = key.exvocation_elements.greeting
                        elif (
                            search_string.lower()
                            in key.exvocation_elements.response.lower()
                        ):
                            first_match = key.exvocation_elements.response

                    if match:
                        dict = {
                            "inv_greeting": key.invocation_elements.greeting,
                            "inv_response": key.invocation_elements.response,
                            "exv_greeting": key.exvocation_elements.greeting,
                            "exv_response": key.exvocation_elements.response,
                            "attrs": json.dumps(
                                list(key.attributes.items()), ensure_ascii=False
                            ),
                            "exvocation_match": exvocation_match,
                            "invocation_match": invocation_match,
                            "first_match": first_match,
                        }
                        _DATA_USED.append(dict)
                        results.append(dict)
                        index += 1
            DATA_USED = _DATA_USED
            CURRENT_PARAMS = _CURRENT_PARAMS

            return json.dumps(
                results, cls=SetEncoder, sort_keys=True, ensure_ascii=False
            )
        except Exception as e:
            return error_(e)

    @app.route("/download")
    def download_data():
        try:
            global DATA_USED
            global CURRENT_SEARCH
            global CURRENT_PARAMS

            font_path = os.path.join(
                os.path.dirname(os.path.realpath(__file__)),
                "static",
                "fonts",
                "PTSans-Regular.ttf",
            )
            bold_font_path = os.path.join(
                os.path.dirname(os.path.realpath(__file__)),
                "static",
                "fonts",
                "PTSans-Bold.ttf",
            )

            pdf = FPDF()
            pdf.add_page()

            pdf.add_font("PTSans", "", font_path, uni=True)
            pdf.add_font("PTSansBold", "", bold_font_path, uni=True)
            pdf.set_font("PTSans", size=15)

            pdf.multi_cell(190, 10, txt=f"Tekst pretraživanja: {CURRENT_SEARCH}")
            pdf.multi_cell(
                190, 20, txt=f'Za attribute pretraživanja:\n{"".join(CURRENT_PARAMS)}'
            )
            pdf.line(10, pdf.get_y(), 190, pdf.get_y())

            for element in DATA_USED:
                pdf.add_page()

                invocation_greeting = element["inv_greeting"]
                invocation_response = element["inv_response"]
                exvocation_greeting = element["exv_greeting"]
                exvocation_response = element["exv_response"]
                attrs = json.loads(element["attrs"])
                attrs_string = ""

                for attr_mapping in attrs:
                    if "entry" not in attr_mapping[0]:
                        values = attr_mapping[1].split(",")
                        if "ostalo" in attr_mapping[0]:
                            tmp = []
                            for value in values:
                                if value.strip() in KOMB_DICTIONARY.keys():
                                    value = KOMB_DICTIONARY[value.strip()]
                                tmp.append(value)
                            values = tmp
                        attrs_string += (
                            f'{attr_mapping[0]} : "{" // ".join(values)}" // '
                        )

                text = f"\nInvokacija:\n - Pozdrav: {invocation_greeting}\n - Odgovor: {invocation_response}\nEksvokacija:\n - Pozdrav: {exvocation_greeting}\n - Odgovor: {exvocation_response}\nAtributi:\n{attrs_string}\n\n"

                pdf.multi_cell(190, 10, txt=text)
                pdf.dashed_line(10, pdf.get_y(), 200, pdf.get_y(), 1, 1)

            file_path = os.path.join(
                os.path.dirname(os.path.realpath(__file__)), "data", "Izvoz.pdf"
            )
            pdf.output(file_path)
        except Exception as e:
            return error_(e)
        return send_file(file_path, as_attachment=True)

    @app.route("/")
    def nez():
        return render_template("starting_page.html")

    @app.route("/korpus")
    def starting_page():
        return render_template("home.html")

    @app.route("/o_radu")
    def about_us():
        return render_template("about_us.html")

    @app.errorhandler(404)
    def error(e):
        return render_template("404.html")

    @app.errorhandler(500)
    def error_(e):
        return render_template("500.html")

    return app
