import os
from flask_cors import cross_origin
from flask import request, jsonify

from google.oauth2 import id_token
from google.auth.transport import requests

def create_login_endpoints(app, user_service, ResponseDTO):
    
    @app.route("/login", methods = ['POST'])
    @cross_origin()
    def login():
        data = request.json
        try : 
            output = user_service.login(data)
            response = ResponseDTO.toDTO('' , 200, output)
            return jsonify(response), 200
        except ValueError :
            response = {'error' : 'Invalid Token', 'status_code' : 401 , 'data' : {}}
            return jsonify(response), 401

    @app.route("/user", methods = ['GET'])
    def getUserInfo():
        try : 
            token = request.headers.get("Authorization").split(' ')[1]
            data = user_service.get_info(token)
            return jsonify(ResponseDTO.toDTO("", 200, data)), 200
        except ValueError :
            return jsonify(ResponseDTO.toDTO("Invalid Token", 401, "")), 401
        
    