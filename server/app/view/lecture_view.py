from flask import request, jsonify
from flask_cors import cross_origin


def create_code_endpoints(app, lecture_service):
    
    @app.route('/executeCode', methods=['POST']) 
    @cross_origin()
    def executeRequestCode():
        print(request)
        data = request.json
        try :
            result, _ = lecture_service.executeCode(data['code'])
            data = {'error': "", 'status_code': 200, "codeResult": [result]}
            return jsonify(data), 200
        except Exception as e:
       
            data = {'error': "", 'status_code': 200, "codeResult": [e.args]}
     
            return jsonify(data), 200
        
    @app.route('/lectures', methods = ['GET'])
    @cross_origin()
    def getLectureList():
        lecture_seq = request.args.get('lecture_seq')
        results = lecture_service.getLecture(lecture_seq)
        data = {'error': "", 'status_code': 200, "data": results}
        return jsonify(data), 200

    @app.route('/lecture', methods = ['POST'])
    def saveLectureContents():
        data = request.json

        result = lecture_service.saveLecture(data)
        if result == 200 :

            return jsonify(data), 200
        else :
            return 400