from audioop import cross
import re
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
    
    @app.route('/lectures/<lecture_seq>/lectureContent/<lecture_content_seq>/code', methods = ['POST'])
    @cross_origin()
    def executeLectureCode(lecture_seq, lecture_content_seq):
        data = request.json
        try :
            result, _ = lecture_service.executeCode(data['code'])
            checkresult = lecture_service.checkResult(result, lecture_content_seq)
            
            if checkresult:
                data = {'error': "", 'status_code': 200, "data": [checkresult]}
            else :
                data = {'error': "", 'status_code': 200, "data": [checkresult]}
            return jsonify(data), 200

        except Exception as e:
       
            data = {'error': "", 'status_code': 400, "data": [e.args]}
     
            return jsonify(data), 200
    
    @app.route('/lectures/<lecture_seq>/lectureContent/<lecture_content_seq>/userSeq/<user_seq>/<int:done>', methods = ['POST'])
    @cross_origin()
    def UserEndLectureContent(lecture_seq, lecture_content_seq, user_seq, done):
        try :
            
            if done == 0 or done == 1:
                if lecture_service.userDoneLectureContent(lecture_content_seq, user_seq, done):
                    data = {'error': "", 'status_code': 200, "data": []}
                    return jsonify(data), 200
                else :
                    data = {'error': "DB 처리 문제", 'status_code': 500, "codeResult": []}
                    return jsonify(data), 500
            else :
                data = {'error': "입력 형식 문제", 'status_code': 400, "codeResult": []}
                return jsonify(data), 400

        except Exception as e:
       
            data = {'error': "", 'status_code': 400, "data": [e.args]}
     
            return jsonify(data), 400
    
    @app.route('/lectures/<lecture_seq>/search/<search_option>', methods = ['GET'])
    def searchLecture(lecture_seq, search_option):
        try:
            request_data = request.json
            searched_lecture = lecture_service.searchLecture(lecture_seq, search_option)
            response = {'error':"", 'status_code' : 200, 'data' :[searched_lecture]}
            return jsonify(response), 200

        except Exception as e :
            data = {'error': "", 'status_code': 400, "data": [e.args]}
            return jsonify(data), 400
        
    @app.route('/lectures/<lecture_seq>/lectureContent/<lecture_content_seq>/like', methods = ['PATCH'])
    def likeLectureContent(lecture_seq, lecture_content_seq):
        try:
            token = request.headers.get("Authorization").split(' ')[1]
            searched_lecture = lecture_service.likeLecture(lecture_content_seq, token)
            response = {'error':"", 'status_code' : 200, 'data' :[searched_lecture]}
            return jsonify(response), 200

        except Exception as e :
            data = {'error': "", 'status_code': 400, "data": [e.args]}
            return jsonify(data), 400
        
    @app.route('/lectures/lectureContents/<lecture_content_seq>', methods = ['GET'])
    def getLectureContent(lecture_content_seq):
        try :
            data = lecture_service.getLectureContent(lecture_content_seq)
            response = {'error':"", 'status_code' : 200, 'data' :[data]}
            return jsonify(response), 200

        except Exception as e :
            data = {'error': "", 'status_code': 400, "data": [e.args]}
            return jsonify(data), 400
  