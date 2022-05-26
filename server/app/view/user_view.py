import json
import os
from flask_cors import cross_origin
from flask import request, jsonify

from google.oauth2 import id_token
from google.auth.transport import requests

def create_login_endpoints(app, user_service):
    
    @app.route("/login", methods = ['POST'])
    @cross_origin()
    def login():
        data = request.json
        try : 
            output = user_service.login(data)
            if output == 400 :
                return jsonify(make_response("User not found", 400, None)), 400
            else :
                return jsonify(make_response(None, 200, output))
        except ValueError :
            response = {'error' : 'Invalid Token', 'status_code' : 401 , 'data' : {}}
            return jsonify(response), 401

    @app.route('/signin', methods = ['POST'])
    @cross_origin()
    def singin():
        data = request.json
        try :
            output = user_service.signin(data)
            if output == 400 :
                return jsonify(make_response("Existing User", 400, None)), 400
            else :
                return jsonify(make_response(None, 200, output)), 200
        ## 나중에 처리하고
        except ValueError:
            response = {'error' : 'Invalid User', 'status_code' : 200 , 'data' : {}}
            return jsonify(response), 400

    @app.route("/user", methods = ['GET'])
    def getUserInfo():
        try : 
            token = request.headers.get("Authorization").split(' ')[1]
            data = user_service.get_info(token)
            return jsonify(make_response(None, 200, data)), 200
        except ValueError :
            return jsonify(make_response(None, 400, None)), 400
    
    @app.route("/user/name", methods = ['PATCH'])
    def changingName():
        data = request.json
        try:
            token = request.headers.get("Authorization").split(' ')[1]
            fixed_name = data['name']
            data = user_service.fix_name(token, fixed_name)
            return jsonify(make_response(None, 200, data)), 200
        except Exception as e:
            return jsonify(make_response(None, 200, [e.args])) , 400
            
    
    @app.route("/user/info", methods = ['GET'])
    def userInfo():
        try :
            token = request.headers.get("Authorization").split(' ')[1]
            data = user_service.get_info(token)
            info = user_service.get_totalInfo(data)
            print(info)
            return jsonify(make_response(None, 200, info)), 200
        except Exception as e :
            return jsonify(make_response(None, 400, e.args)), 400

    @app.route("/user/lectureContents/<lecture_content_seq>/done", methods = ['GET'])
    def getUserDoneLecture(lecture_content_seq):
        try:
            token = request.headers.get("Authorization").split(' ')[1]
            data = user_service.isUserDoneLecture(token, lecture_content_seq)
            print(data)
            return jsonify(make_response(None, 200, data)), 200
        except Exception as e :
            return jsonify(make_response(None, 400, e.args)), 400
            
    def make_response(error, code, data) :
        return {'error' : error, 'status_code' : code , 'data' : data}