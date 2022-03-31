from google.oauth2 import id_token
from google.auth.transport import requests

import os 

CLIENT_ID = os.environ.get("GOOGLE_CLIENT_ID", '923198322735-8m8aomqof0no00kcp1u145hr9ung1gbq.apps.googleusercontent.com')


class UserService:
    def __init__(self) :
        # self.user_dao = UserDAO
        pass

    def login(self, data):
        try:
            token = data['tokenObj']['id_token']
            id_token.verify_oauth2_token(token, requests.Request(), CLIENT_ID)
            name = data['Ju']['hY']
            email = data['Ju']['zv']
            return {'name' : name, 'email' : email, 'token' : token}
        except ValueError :
            return ValueError
    
    def get_info(self, token):
        try:
            valid_token = id_token.verify_oauth2_token(token, requests.Request(), CLIENT_ID)
            name = valid_token['name']
            email = valid_token['email']
            return {'name' : name, 'email' : email}
        except ValueError :
            return ValueError
        

        
            