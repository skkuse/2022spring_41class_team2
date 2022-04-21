import re
from flask import request, jsonify
from flask_cors import cross_origin
from google.oauth2 import id_token
from google.auth.transport import requests

def create_code_endpoints(app, code_service):
    
    @app.route('/executeCode', methods=['POST']) 
    @cross_origin()
    def executeRequestCode():
        data = request.json
        try :
            result, _ = code_service.executeCode(data['code'])
            data = {'error': "", 'status_code': 200, "codeResult": [result]}
            return jsonify(data), 200
        except Exception as e:
       
            data = {'error': "", 'status_code': 200, "codeResult": [e.args]}
     
            return jsonify(data), 200