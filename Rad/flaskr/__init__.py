import os
import json
from .xml_reader import main, return_entries
from flask import Flask, render_template, request, send_file, redirect, url_for
from werkzeug.utils import secure_filename
from fpdf import FPDF

# cmd
# set FLASK_APP=flaskr
# set FLASK_ENV=development
# flask run

_DATA =  xml_reader.return_entries()
DATA_USED = []
CURRENT_SEARCH = None
CURRENT_PARAMS = None

KOMB_DICTIONARY = {
    "ipv1": "pozdravna formula",
    "ipv2": "pozdravna formula s vokativom",
    "ipv3": "vokativ s pozdravnom formulom",
    "ipv4": "pitanje s vokativom obraćanja",
    "ipv5": "vokativ obraćanja s pitanjem",
    "ipv6": "pozdrav s pitanjem",
    "ipv7": "pitanje i poziv na druženje",
    "ipv0": "Nepoznato",

    "ipn1": "rukovanje",
    "ipn2": "pružanje ruke",
    "ipn3": "tapšanje po ramenu i sl.",
    "ipn4": "kimanje glavom",
    "ipn5": "mahanje",
    "ipn6": "ljubljenje",
    "ipn7": "grljenje",
    "ipn8": "pusa u zraku",
    "ipn9": "ignoriranje",
    "ipn10": "daj pet",
    "ipn11": "osmijeh ili smiješak",
    "ipn12": "pozdrav šakom (šakica)",
    "ipn13": "pozdrav kao pri obaranju ruke",
    "ipn0": "Nepoznato",

    "iov1": "odzdravna formula",
    "iov2": "odzdravna formula s vokativom",
    "iov3": "vokativ s odzdravnom formulom",
    "iov4": "skretanje pozornosti na prisutnost uporabom prezentativa",
    "iov5": "potvrda prisutnosti mjesnim prilogom",
    "iov6": "uzvik oduševljenja",
    "iov0": "Nepoznato",

    "ion1": "rukovanje",
    "ion2": "pružanje ruke",
    "ion3": "tapšanje po ramenu i sl.",
    "ion4": "kimanje glavom",
    "ion5": "mahanje",
    "ion6": "ljubljenje",
    "ion7": "grljenje",
    "ion8": "pusa u zraku",
    "ion9": "ignoriranje",
    "ion10": "daj pet",
    "ion11": "osmijeh ili smiješak",
    "ion12": "pozdrav šakom (šakica)",
    "ion13": "pozdrav kao pri obaranju ruke",
    "ion0": "Nepoznato",
    "epv1": "najavljivanje kraja susreta",
    "epv2": "zaključivanje razgovora",
    "epv3": "planiranje idućega susreta",
    "epv4": "poziv na idući susret",
    "epv5": "naznaka želje za lijepo provedenim vremenom",
    "epv6": "isprika radi otklanjanja sumnje u eventualne loše namjere",
    "epv7": "slanje pozdrava (obitelji, prijateljima...)",
    "epv8": "izražavanje zadovoljstva zbog susreta i zahvaljivanje za uspostavljenom komunikacijom",
    "epv9": "pozdravljanje sugovornika",
    "epv10": "prekidanje razgovora u slučaju neuspjele komunikacije",
    "epv0": "Nepoznato",

    "epn1": "rukovanje",
    "epn2": "pružanje ruke",
    "epn3": "tapšanje po ramenu i sl.",
    "epn4": "kimanje glavom",
    "epn5": "mahanje",
    "epn6": "ljubljenje",
    "epn7": "grljenje",
    "epn8": "pusa u zraku",
    "epn9": "ignoriranje",
    "epn10": "daj pet",
    "epn11": "osmijeh ili smiješak",
    "epn12": "pozdrav šakom (šakica)",
    "epn13": "pozdrav kao pri obaranju ruke",
    "epn0": "Nepoznato",

    "eov1": "najavljivanje kraja susreta",
    "eov2": "zaključivanje razgovora",
    "eov3": "planiranje idućega susreta",
    "eov4": "poziv na idući susret",
    "eov5": "naznaka želje za lijepo provedenim vremenom",
    "eov6": "isprika radi otklanjanja sumnje u eventualne loše namjere",
    "eov7": "slanje pozdrava (obitelji, prijateljima...)",
    "eov8": "izražavanje zadovoljstva zbog susreta i zahvaljivanje za uspostavljenom komunikacijom",
    "eov9": "pozdravljanje sugovornika",
    "eov10": "prekidanje razgovora u slučaju neuspjele komunikacije",
    "eov0": "Nepoznato",

    "eon1": "rukovanje",
    "eon2": "pružanje ruke",
    "eon3": "tapšanje po ramenu i sl.",
    "eon4": "kimanje glavom",
    "eon5": "mahanje",
    "eon6": "ljubljenje",
    "eon7": "grljenje",
    "eon8": "pusa u zraku",
    "eon9": "ignoriranje",
    "eon10": "daj pet",
    "eon11": "osmijeh ili smiješak",
    "eon12": "pozdrav šakom (šakica)",
    "eon13": "pozdrav kao pri obaranju ruke",
    "eon0": "Nepoznato",
}

class SetEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, set):
            return list(obj)
        return json.JSONEncoder.default(self, obj)

def create_app(test_config=None):

    # Create and configure app
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

    app.config['UPLOAD_FOLDER'] = "test_upload"
    ALLOWED_EXTENSIONS = 'xml'

    def save_file(file):
        if file.filename.rsplit(".")[1] in ALLOWED_EXTENSIONS:
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        else:
            raise Exception("Pogrešna datoteka je prenesena, mora biti tipa xml")
    
    @app.route('/uploader', methods = ['GET', 'POST'])
    def upload_file():
        if request.method == 'POST':
            if 'file' not in request.files:
                return 'Nema prenesene datoteke!'
            file = request.files['file']
            if file.filename == '':
                return 'Nije odabrana datoteka'
            try:
                save_file(file)
                return 'Unesen je riječnik!'
            except Exception as e:
                return 'Dogodila se greška '+ str(e)

    @app.route("/dict", methods=['GET'])
    def return_dict():
        dictionary_attributes= set(xml_reader.main())
        json_dictionary_attributes = json.dumps(dictionary_attributes, cls=SetEncoder, sort_keys=True, ensure_ascii=False)
        return json_dictionary_attributes

    @app.route("/search", methods=['POST'])
    def return_search_data():
    # Return data depending on search parameters
        global DATA_USED
        global CURRENT_SEARCH
        global CURRENT_PARAMS
        _CURRENT_PARAMS = []
        _DATA_USED = []
        search_string = request.form['search_string']
        search_params = json.loads(request.form['search_params'], encoding="utf-8")
        search_type = request.form['search_type']
        basic = False
        CURRENT_SEARCH = search_string

        if search_type == '0':
            basic = True 

        or_attributes = {
            "emocije": [],
            "opis": [],
            "sudionik": []
        }

        rest_attributes = {}
        search_scene = None

        try:
            search_scene = search_params["search_scene"]
            del search_params["search_scene"]
        except Exception:
            print("Nema ga")

        if basic:
            for key in search_params:
                _CURRENT_PARAMS.append(f"{key}: {search_params[key]} // ")

                if "emocija" in key:
                    or_attributes['emocije'].append(key)
                elif "sudionik" in key and key is not "zamjena_sudionika":
                    or_attributes['sudionik'].append(key)
                elif "opis" in key:
                    or_attributes['opis'].append(key)
                else:
                    rest_attributes[key] = search_params[key]
        else:
            for key in search_params:
                rest_attributes[key] = search_params[key]

        results = []
        index = 0
        
        for key in _DATA:
            match = True
            
            if search_string.lower() in key.invocation_elements.greeting.lower() or \
            search_string.lower() in key.exvocation_elements.greeting.lower() or \
            search_string.lower() in key.invocation_elements.response.lower() or \
            search_string.lower() in key.exvocation_elements.response.lower():

                if basic:
                    for attribute_section in or_attributes:
                        if len(or_attributes[attribute_section]) > 1:
                            or_match = False
                            value = search_params[or_attributes[attribute_section][0]]
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
                            if search_params[search_attribute] not in key.attributes[search_attribute]:
                                match = False
                                break
                        except KeyError:
                            match = False
                    
                invocation_match = search_string.lower() in key.invocation_elements.response.lower() or search_string.lower() in key.invocation_elements.greeting.lower()
                exvocation_match = search_string.lower() in key.exvocation_elements.response.lower() or search_string.lower() in key.exvocation_elements.greeting.lower()
                if not basic and search_scene is not None:
                    if search_scene == 'inv-exv' and invocation_match == False and exvocation_match == False:
                        match = False
                    elif (search_scene == 'inv' and invocation_match == False) or (search_scene == 'exv' and exvocation_match == False):
                        match = False
                
                if invocation_match:
                    if search_string.lower() in key.invocation_elements.greeting.lower():
                        first_match = key.invocation_elements.greeting
                    elif search_string.lower() in key.invocation_elements.response.lower():
                        first_match = key.invocation_elements.response
                elif exvocation_match:
                    if search_string.lower() in key.exvocation_elements.greeting.lower():
                        first_match = key.exvocation_elements.greeting
                    elif search_string.lower() in key.exvocation_elements.response.lower():
                        first_match = key.exvocation_elements.response
                        
                if match:
                    dict = {
                        "inv_greeting": key.invocation_elements.greeting,
                        "inv_response": key.invocation_elements.response,
                        "exv_greeting": key.exvocation_elements.greeting,
                        "exv_response": key.exvocation_elements.response,
                        "attrs": json.dumps(list(key.attributes.items()), ensure_ascii=False),
                        "exvocation_match": exvocation_match,
                        "invocation_match": invocation_match,
                        "first_match": first_match
                        }
                    _DATA_USED.append(dict)
                    results.append(dict)
                    index +=1
        DATA_USED = _DATA_USED
        CURRENT_PARAMS = _CURRENT_PARAMS

        return json.dumps(results, cls=SetEncoder, sort_keys=True, ensure_ascii=False)

    
    @app.route("/download")
    def download_data():
        global DATA_USED
        global CURRENT_SEARCH 
        global CURRENT_PARAMS
        
        font_path = os.path.join(os.path.dirname(os.path.realpath(__file__)), "static", "fonts", "PTSans-Regular.ttf")
        bold_font_path = os.path.join(os.path.dirname(os.path.realpath(__file__)), "static", "fonts", "PTSans-Bold.ttf")
        
        pdf = FPDF()
        pdf.add_page()

        pdf.add_font("PTSans", "", font_path, uni=True)
        pdf.add_font("PTSansBold", "", bold_font_path, uni=True)
        pdf.set_font("PTSans", size=15)

        pdf.multi_cell(190, 10, txt=f"Tekst pretraživanja: {CURRENT_SEARCH}")
        pdf.multi_cell(190, 20, txt=f'Za attribute pretraživanja:\n{"".join(CURRENT_PARAMS)}')
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
                    attrs_string += f'{attr_mapping[0]} : "{" // ".join(values)}" // '

            text = f"\nInvokacija:\n - Pozdrav: {invocation_greeting}\n - Odgovor: {invocation_response}\nEksvokacija:\n - Pozdrav: {exvocation_greeting}\n - Odgovor: {exvocation_response}\nAtributi:\n{attrs_string}\n\n"
            
            pdf.multi_cell(190, 10, txt=text)
            pdf.dashed_line(10, pdf.get_y(), 200, pdf.get_y(), 1, 1)

        
        file_path = os.path.join(os.path.dirname(os.path.realpath(__file__)), "data", "Test.pdf")
        try:
            pdf.output(file_path)
        except Exception as e:
            return redirect(url_for('starting_page'))
        return send_file(file_path, as_attachment=True)

    @app.route("/")
    def nez():
        return render_template("starting_page.html")

    @app.route("/korpus")
    def starting_page():
        return render_template('home.html')

    @app.route("/o_radu")
    def about_us():
        return render_template("about_us.html")
    return app
