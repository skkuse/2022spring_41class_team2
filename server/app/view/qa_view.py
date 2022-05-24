
from audioop import cross
import re
from flask import request, jsonify
from flask_cors import cross_origin


def create_qa_endpoints(app, qa_service):

    @app.route('/lectures/<lecture_seq>/lectureContent/<lecture_content_seq>/userSeqs/<user_seq>/qa', methods = ['POST'])
    @cross_origin()
    def saveQA(lecture_seq, lecture_content_seq, user_seq):
        try:
            request_data = request.json
            qa_title = request_data['qa_title']
            qa_content = request_data['qa_content']
            if lecture_content_seq != "-1" :
                isDone = qa_service.saveQA(lecture_content_seq, user_seq,qa_title, qa_content)
                if isDone:
                    response = {'error': "", 'status_code': 200, "data": []}
                    return jsonify(response), 200
                else :
                    response = {'error': "", 'status_code': 400, "data": []}
                    return jsonify(response), 400
            else :
                isDone = qa_service.saveQA(None, user_seq ,qa_title, qa_content)
                if isDone:
                    response = {'error': "", 'status_code': 200, "data": []}
                    return jsonify(response), 200
                else :
                    response = {'error': "", 'status_code': 400, "data": []}
                    return jsonify(response), 400

        except Exception as e:
       
            data = {'error': "", 'status_code': 400, "data": [e.args]}
     
            return jsonify(data), 400

    # @app.route('/lectures/<lecture_seq>/lectureContent/<lecture_content_seq>/userSeqs/<user_seq>/qa/<qa_seq>', methods = ['GET'])
    # @cross_origin()
    # def getQA(lecture_seq, lecture_content_seq, user_seq, qa_seq):
    #     try:
    #         qa_content = qa_service.getQA(qa_seq)
    #         response = {'error': "", 'status_code': 200, "data": [qa_content]}
    #         return jsonify(response), 200
    #     except Exception as e:
    #         data = {'error': "", 'status_code': 400, "data": [e.args]}
    #         return jsonify(data), 400
    
    @app.route('/qna', methods = ['GET'])
    def getFreeQnA():
        try :
            qa_content = qa_service.getFreeQnA()
            response = {'error' : "", 'status_code' : 200, 'data' : [qa_content]}
            return jsonify(response), 200

        except Exception as e :
            data = {'error': "", 'status_code': 400, "data": [e.args]}
            return jsonify(data), 400
    
    @app.route('/lectures/lectureContents/<lecture_content_seq>/qa', methods = ['GET'])
    def getLectureQnA(lecture_content_seq):
        try :
            print("?")
            qa_content = qa_service.getLectureQnA_service(lecture_content_seq)
            response = {'error' : "", 'status_code' : 200, 'data' : [qa_content]}
            return jsonify(response), 200

        except Exception as e :
            data = {'error': "", 'status_code': 400, "data": [e.args]}
            return jsonify(data), 400