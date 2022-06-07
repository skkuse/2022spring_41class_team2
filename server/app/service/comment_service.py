from datetime import datetime
import os
from google.oauth2 import id_token
from google.auth.transport import requests
import markdown

CLIENT_ID = os.environ.get("GOOGLE_CLIENT_ID", '923198322735-8m8aomqof0no00kcp1u145hr9ung1gbq.apps.googleusercontent.com')

class CommentService() :
    def __init__(self, user_model, comment_model):
        self.comment_model = comment_model
        self.user_model = user_model
   
    
    def saveComment(self,  token, qa_seq, qa_content):
        try :
            valid_token = id_token.verify_oauth2_token(token, requests.Request(), CLIENT_ID)
            email = valid_token['email']
            user_seq = self.user_model.findUser(email)['user_seq']
            qa_createtime = datetime.now()
            
            self.comment_model.saveComment(user_seq, qa_seq, qa_content, qa_createtime)
            return True
        except Exception as e:
            print(e.args)
            return e.args
    
    def getComment(self, qa_seq):
        try:
            comment_list = self.comment_model.getComment(qa_seq)
            print(comment_list)
            return comment_list
        except Exception as e:

            return e.args