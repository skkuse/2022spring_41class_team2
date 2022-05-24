
from audioop import cross
import re
from tokenize import cookie_re
from flask import request, jsonify
from flask_cors import cross_origin


def create_comment_endpoints(app, comment_service):
    
    @app.route('/qa/<qa_seq>/comment', methods = ['POST'])
    @cross_origin()
    def saveComment(qa_seq):
        try:
            request_data = request.json
            comment_content = request_data['comment_content']
            user_email = request_data['user_email']
            comment_service.saveComment(user_email, qa_seq, comment_content)
            response = {'error': "", 'status_code': 200, "data": []}
            return jsonify(response), 200
        except Exception as e:
       
            data = {'error': "", 'status_code': 400, "data": [e.args]}
     
            return jsonify(data), 400
    
    @app.route('/qa/<qa_seq>/comments', methods = ['GET'])
    @cross_origin()
    def getComment(qa_seq):
        try:
            comment_content = comment_service.getComment(qa_seq)
            if comment_content == 400 :
                data = {'error': "", 'status_code': 400, "data": [e.args]}
                return jsonify(data), 400
            else:
                response = {'error': "", 'status_code': 200, "data": [comment_content]}
                return jsonify(response), 200
        except Exception as e:
       
            data = {'error': "", 'status_code': 400, "data": [e.args]}
     
            return jsonify(data), 400
    