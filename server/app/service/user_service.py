from distutils.log import info
from google.oauth2 import id_token
from google.auth.transport import requests

import os 

CLIENT_ID = os.environ.get("GOOGLE_CLIENT_ID", '923198322735-8m8aomqof0no00kcp1u145hr9ung1gbq.apps.googleusercontent.com')


class UserService:
    def __init__(self, user_model) :
        self.user_model = user_model

    def login(self, data):
        try:
            token = data['tokenObj']['id_token']
            id_token.verify_oauth2_token(token, requests.Request(), CLIENT_ID)
            if 'Ru' in data :
                name = data['Ru']['vY']
                email = data['Ru']['Hv']
            else :
                name = data['Xu']['sf']
                email = data['Xu']['Ov']
            if self.user_model.findUser(email):
                return {'name' : name, 'email' : email, 'token' : token}
            else :
                return 400
                
        except ValueError :
            return ValueError
    
    def get_info(self, token):
        try:
            valid_token = id_token.verify_oauth2_token(token, requests.Request(), CLIENT_ID)
            email = valid_token['email']
            user_info = self.user_model.findUser(email)
            return {'name' : user_info['user_name'], 'email' : email}
        except ValueError :
            return ValueError
    

    def signin(self, data):
        try:
            token = data['tokenObj']['id_token']
          
            id_token.verify_oauth2_token(token, requests.Request(), CLIENT_ID)
            if 'Ru' in data :
                name = data['Ru']['vY']
                email = data['Ru']['Hv']
            else :
                name = data['Xu']['sf']
                email = data['Xu']['Ov']
  
            if not self.user_model.findUser(email) :
                self.user_model.saveUser(name, email)
                return {"name" : name, "email" : email, "token" : token}
            else :
                return 400

        except ValueError :
            return ValueError
        
    def get_totalInfo(self, data) :
        try :
            info_dict = {}
            attending_lecture_info = self.user_model.getAttendingLecture(data['email'])
            like_lecture_info = self.user_model.getlikeLecture(data['email'])
            qa_info = self.user_model.getmyQA(data['email'])
            if attending_lecture_info :
                information = []
                for lecture_info in attending_lecture_info :
                    information.append(lecture_info['lecture_content_title'])
                info_dict['attending_lecture'] = information
            else :
                info_dict['attedning_lecture'] = []
            if like_lecture_info :
                information = []
                for lecture_info in like_lecture_info :
                    information.append(lecture_info['lecture_content_title'])
                info_dict['like_lecture_info'] = information
                
            else :
                info_dict['like_lecture_info'] = []
            if qa_info:
                print(qa_info)
                info_dict['qa_info'] = list(qa_info[0].values())
            else :
                info_dict['qa_info'] = []
            return info_dict
        except Exception as e :
            return e.args
    
    def fix_name(self, token, fixed_name):
        try :
            valid_token = id_token.verify_oauth2_token(token, requests.Request(), CLIENT_ID)
            email = valid_token['email']
            self.user_model.fix_name(email, fixed_name)
            return {"name" : fixed_name, "email" : email}
        except Exception as e :
            return e.args
        
    def isUserDoneLecture(self, token, lecture_content_seq):
        try :
            valid_token = id_token.verify_oauth2_token(token, requests.Request(), CLIENT_ID)
            email = valid_token['email']
            result = self.user_model.isUserDoneLecture(email, lecture_content_seq)
            return result
        except Exception as e :
            return e.args