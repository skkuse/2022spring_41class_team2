import sys
import io
from datetime import datetime
from werkzeug.utils import secure_filename
from pathlib import Path
import os
import json

class LectureService() :
    def __init__(self, lecture_model, user_model):
        self.dirname = os.path.join(os.path.dirname(__file__), 'buffer')
        self.lecture_model = lecture_model
        self.user_model = user_model
    def executeCode(self, code):

        codeOut = io.StringIO()
        codeErr = io.StringIO() 
        sys.stdout = codeOut
        sys.stderr = codeErr
        exec(code)
  
        # restore stdout and stderr
        sys.stdout = sys.__stdout__
        sys.stderr = sys.__stderr__

        result = codeOut.getvalue()
        if codeErr.getvalue != None :
            result = codeOut.getvalue()

            codeOut.close()
            codeErr.close()
            return result, None
        else :
            error = codeErr.getvalue()
            codeOut.close()
            codeErr.close()
            return None, error
    
    def saveLecture(self, data):
        lecture_seq = data['lecture_seq']
        lecture_content_description = data['lecture_content_description']
        lecture_content_difficulty = data['lecture_content_difficulty']
        create_time = datetime.now()
        file_path = os.path.join(self.dirname, data['lecture_content'])
        if os.path.isfile(file_path):
            lecture_content_metadata = secure_filename(data['lecture_content'])
            print(data.keys())
            if 'lecture_content_answer' in data.keys() :
                self.lecture_model.saveLecture(
                    lecture_seq, 
                    lecture_content_description, 
                    0, 
                    lecture_content_difficulty, 
                    lecture_content_metadata, 
                    create_time,
                    data['lecture_content_answer'])
            else:
                self.lecture_model.saveLecture(
                    lecture_seq, 
                    lecture_content_description, 
                    0, 
                    lecture_content_difficulty, 
                    lecture_content_metadata, 
                    create_time)
            return 200
        else :
            return 400
    
    def getLecture(self, lecture_seq):
        try:
            results = self.lecture_model.getLecture(lecture_seq)
            for result in results :
                result['lecture_content'] = result['lecture_content'].decode('utf-8')
            return results
        except Exception:
            return 400

    def checkResult(self, code_result, lecture_content_seq):
        try:
            answer = self.lecture_model.getLectureAnswer(lecture_content_seq)
            if answer['lecture_answer'] == str(bytes(code_result, 'utf-8')):
                return True
            else :
                return False
        except Exception as e:
            print(e.args)
            return 400
        
    def userDoneLectureContent(self, lecture_content_seq, user_seq, done):
        try:
            self.lecture_model.userDoneLectureContent(lecture_content_seq, user_seq, done)
            result = self.lecture_model.getUserLectureContentDone(lecture_content_seq, user_seq, done)
            if result['attending_done'] == done:
                return True
            else :
                return False
        except Exception as e:
            print(e.args)
            return 400

    def saveQA(self, lecture_content_seq, user_seq,qa_title, qa_content):
        try:
            create_time = datetime.now()
            if lecture_content_seq != None :
                self.lecture_model.saveQA(lecture_content_seq, user_seq, qa_title, qa_content, create_time)
                return True
            else :
                self.lecture_model.saveQAWithOutLecture(user_seq, qa_title, qa_content, create_time)
                return True
        except Exception as e:
            print(e.args)
            return False
        
    def getQA(self, qa_seq):
        try:
            qa_content = self.lecture_model.getQA(qa_seq)
            return qa_content['qa_content']
        except Exception as e:
            print(e.args)
            return False
    
    def saveComment(self,  user_seq, qa_seq, qa_content):
        try :
            qa_createtime = datetime.now()
            self.lecture_model.saveComment(user_seq, qa_seq, qa_content, qa_createtime)
            return True
        except Exception as e:
            print(e.args)
            return False
    
    def searchLecture(self, lecture_seq, search_option) :
        try :
            searched_output = self.lecture_model.searchLecutre(lecture_seq, search_option)
            for result in searched_output :
                result['lecture_content'] = result['lecture_content'].decode('utf-8')
            print(searched_output)
            return searched_output
        except Exception as e :
            return False