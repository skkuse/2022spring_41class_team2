from crypt import methods
import os
from flask_cors import cross_origin
from flask import request, jsonify

from google.oauth2 import id_token
from google.auth.transport import requests

CLIENT_ID = os.environ.get("GOOGLE_CLIENT_ID", '923198322735-8m8aomqof0no00kcp1u145hr9ung1gbq.apps.googleusercontent.com')

def create_login_endpoints(app):
    
    @app.route("/login", methods = ['POST'])
    @cross_origin()
    def login():
        data = request.json
        try : 
            token = data['tokenObj']['id_token']
            id_token.verify_oauth2_token(token, requests.Request(), CLIENT_ID)
            name = data['Ju']['hY']
            email = data['Ju']['zv']
            response = {'error' : '', 'status_code' : 200, 'data' : {'name' : name, 'email' : email, 'token' : token}}
            return jsonify(response), 200
        except ValueError :
            response = {'error' : 'Invalid Token', 'status_code' : 401 , 'data' : {}}
            return jsonify(response), 401

    @app.route("/user", methods = ['POST'])
    def getUserInfo():
        data = request.json
        try : 
            token = data['token']
            valid_token = id_token.verify_oauth2_token(token, requests.Request(), CLIENT_ID)
            name = valid_token['name']
            email = valid_token['email']
            response = {'error' : '', 'status_code' : 200, 'data' : {'name' : name, 'email' : email}}
            return jsonify(response), 200
        except ValueError :
            response = {'error' : 'Invalid Token', 'status_code' : 401 , 'data' : {}}
            return jsonify(response), 401
        
    