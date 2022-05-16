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
    
    @app.route('/lectures/<lecture_seq>/lectureContent/<lecture_content_seq>/userSeqs/<user_seq>/qa', methods = ['POST'])
    @cross_origin()
    def saveQA(lecture_seq, lecture_content_seq, user_seq):
        try:
            request_data = request.json
            qa_title = request_data['qa_title']
            qa_content = request_data['qa_content']
            if lecture_content_seq != "-1" :
                isDone = lecture_service.saveQA(lecture_content_seq, user_seq,qa_title, qa_content)
                if isDone:
                    response = {'error': "", 'status_code': 200, "data": []}
                    return jsonify(response), 200
                else :
                    response = {'error': "", 'status_code': 400, "data": []}
                    return jsonify(response), 400
            else :
                isDone = lecture_service.saveQA(None, user_seq ,qa_title, qa_content)
                if isDone:
                    response = {'error': "", 'status_code': 200, "data": []}
                    return jsonify(response), 200
                else :
                    response = {'error': "", 'status_code': 400, "data": []}
                    return jsonify(response), 400

        except Exception as e:
       
            data = {'error': "", 'status_code': 400, "data": [e.args]}
     
            return jsonify(data), 400

    @app.route('/lectures/<lecture_seq>/lectureContent/<lecture_content_seq>/userSeqs/<user_seq>/qa/<qa_seq>', methods = ['GET'])
    @cross_origin()
    def getQA(lecture_seq, lecture_content_seq, user_seq, qa_seq):
        try:
            qa_content = lecture_service.getQA(qa_seq)
            response = {'error': "", 'status_code': 200, "data": [qa_content]}
            return jsonify(response), 200
        except Exception as e:
            data = {'error': "", 'status_code': 400, "data": [e.args]}
            return jsonify(data), 400
    
    @app.route('/qa/<qa_seq>/comment', methods = ['POST'])
    @cross_origin()
    def saveComment(qa_seq):
        try:
            request_data = request.json
            comment_content = request_data['comment_content']
            user_email = request_data['user_email']
            lecture_service.saveComment(user_email, qa_seq, comment_content)
            response = {'error': "", 'status_code': 200, "data": []}
            return jsonify(response), 200
        except Exception as e:
       
            data = {'error': "", 'status_code': 400, "data": [e.args]}
     
            return jsonify(data), 400
    
    @app.route('/qa/<qa_seq>/comments', methods = ['GET'])
    @cross_origin()
    def getComment(qa_seq):
        try:
            comment_content = lecture_service.getComment(qa_seq)
            if comment_content == 400 :
                data = {'error': "", 'status_code': 400, "data": [e.args]}
                return jsonify(data), 400
            else:
                response = {'error': "", 'status_code': 200, "data": [comment_content]}
                return jsonify(response), 200
        except Exception as e:
       
            data = {'error': "", 'status_code': 400, "data": [e.args]}
     
            return jsonify(data), 400

    @app.route('/qna', methods = ['GET'])
    def getFreeQnA():
        try :
            qa_content = lecture_service.getFreeQnA()
            response = {'error' : "", 'status_code' : 200, 'data' : [qa_content]}
            return jsonify(response), 200

        except Exception as e :
            data = {'error': "", 'status_code': 400, "data": [e.args]}
            return jsonify(data), 400
    
    @app.route('/lectures/<lecture_seq>/lectureContents/<lecture_content_seq>', methods = ['GET'])
    def getLectureQnA(lecture_seq, lecture_content_seq):
        try :
            qa_content = lecture_service.getLectureQnA_service(lecture_seq, lecture_content_seq)
            response = {'error' : "", 'status_code' : 200, 'data' : [qa_content]}
            return jsonify(response), 200

        except Exception as e :
            data = {'error': "", 'status_code': 400, "data": [e.args]}
            return jsonify(data), 400
    
    @app.route('/lectures/<lecture_seq>/search', methods = ['GET'])
    def searchLecture(lecture_seq):
        try:
            request_data = request.json
            search_option = request_data['search_option']
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

  