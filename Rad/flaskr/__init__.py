import os
import json
from .xml_reader import main, return_entries
from flask import Flask, render_template, request
from werkzeug.utils import secure_filename

# cmd
# set FLASK_APP=flaskr
# set FLASK_ENV=development
# flask run

_DATA =  xml_reader.return_entries()

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

    # @app.route("/return")
    # def return_entries():
    #     list_dictionary = xml_reader.return_entries()
    #     list_dictionary = json.dumps(list_dictionary, cls=SetEncoder, sort_keys=True, ensure_ascii=False)
    #     return list_dictionary

    @app.route("/dict", methods=['GET'])
    def return_dict():
        dictionary_attributes= set(xml_reader.main())
        json_dictionary_attributes = json.dumps(dictionary_attributes, cls=SetEncoder, sort_keys=True, ensure_ascii=False)
        return json_dictionary_attributes

    @app.route("/search", methods=['POST'])
    def return_search_data():
    # Return data depending on search parameters
        search_string = request.form['search_string']
        search_params = request.form['search_params']
        results = []
        index = 0
        for key in _DATA:
            match = False
            
            if search_string in key.invocation_elements.greeting or \
            search_string in key.exvocation_elements.greeting or \
            search_string in key.invocation_elements.response or \
            search_string in key.exvocation_elements.response:

                dict = {
                    "inv_greeting": key.invocation_elements.greeting,
                    "inv_response": key.invocation_elements.response,
                    "exv_greeting": key.exvocation_elements.greeting,
                    "exv_response": key.exvocation_elements.response,
                    "attrs": json.dumps(list(key.attributes.items())),
                    }
                results.append(dict)
                index +=1
                
        print(index)
        return json.dumps(results, cls=SetEncoder, sort_keys=True, ensure_ascii=False)

    @app.route("/")
    def starting_page():
        # print(_DATA)
        return render_template('home.html')
    return app
