
import json
from flask import request, jsonify, make_response

def create_test_endpoints(app): #[1]
    
    @app.route('/test', methods=['GET']) #[2]
    def connectionTest():
        print("Work")
        data = {'error': "", 'status_code': 200, "data": ["Success"]}
        return jsonify(data), 200