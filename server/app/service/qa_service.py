from datetime import datetime
from google.oauth2 import id_token
from google.auth.transport import requests


CLIENT_ID = os.environ.get("GOOGLE_CLIENT_ID", '923198322735-8m8aomqof0no00kcp1u145hr9ung1gbq.apps.googleusercontent.com')

class QAService() :
    def __init__(self, qa_model):
        self.qa_model = qa_model

    def saveQA(self, lecture_content_seq, token,qa_title, qa_content):
        try:
            create_time = datetime.now()
            valid_token = id_token.verify_oauth2_token(token, requests.Request(), CLIENT_ID)
            email = valid_token['email']
            if lecture_content_seq != None :
                self.qa_model.saveQA(lecture_content_seq, email, qa_title, qa_content, create_time)
                return True
            else :
                self.qa_model.saveQAWithOutLecture(email, qa_title, qa_content, create_time)
                return True
        except Exception as e:
            print(e.args)
            return False
        
    def getQA(self, qa_seq):
        try:
            qa_content = self.qa_model.getQA(qa_seq)
            return qa_content['qa_content']
        except Exception as e:
            print(e.args)
            return False
    
    def getFreeQnA(self):
        try :
            qa_contents = []
            all_contents = self.qa_model.getFreeQnA()
            for content in all_contents :
                if content['lecture_content_seq'] :
                    continue
                else :
                    qa_contents.append(content)
            return qa_contents
        except Exception as e:
            return e.args
    
    def getLectureQnA_service(self, lecuture_content_seq):
        try :
            print("?")
            qa_contents = self.qa_model.getLectureQnA_model(lecuture_content_seq)
            print(qa_contents)
            return qa_contents
        except Exception as e:
            return e.args