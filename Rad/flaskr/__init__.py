import os
import json
from .xml_reader import main, return_entries
from flask import Flask, render_template, request
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

        if basic:
            for key in search_params:
                _CURRENT_PARAMS.append(f"{key}: {search_params[key]} | ")

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
            
            if search_string in key.invocation_elements.greeting or \
            search_string in key.exvocation_elements.greeting or \
            search_string in key.invocation_elements.response or \
            search_string in key.exvocation_elements.response:

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
                    
                invocation_match = search_string in key.invocation_elements.response or search_string in key.invocation_elements.greeting
                exvocation_match = search_string in key.exvocation_elements.response or search_string in key.exvocation_elements.greeting

                if invocation_match:
                    if search_string in key.invocation_elements.greeting:
                        first_match = key.invocation_elements.greeting
                    elif search_string in key.invocation_elements.response:
                        first_match = key.invocation_elements.response
                elif exvocation_match:
                    if search_string in key.exvocation_elements.greeting:
                        first_match = key.exvocation_elements.greeting
                    elif search_string in key.exvocation_elements.response:
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
        return "Kull"

    @app.route("/")
    def starting_page():
        return render_template('home.html')
    return app
