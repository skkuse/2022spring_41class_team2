from google.oauth2 import id_token
from google.auth.transport import requests

import os 

CLIENT_ID = os.environ.get("GOOGLE_CLIENT_ID", '923198322735-8m8aomqof0no00kcp1u145hr9ung1gbq.apps.googleusercontent.com')


class UserService:
    def __init__(self, user_model) :
        self.user_model = user_model
        pass

    def login(self, data):
        try:
            token = data['tokenObj']['id_token']
          
            id_token.verify_oauth2_token(token, requests.Request(), CLIENT_ID)

            name = data['Ru']['vY']
            email = data['Ru']['Hv']
            print(name, email, token)
            if self.user_model.findUser(email):
                return {'name' : name, 'email' : email, 'token' : token}
            else :
                return 400
                
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
    

    def signin(self, data):
        try:
            token = data['tokenObj']['id_token']
          
            id_token.verify_oauth2_token(token, requests.Request(), CLIENT_ID)
            name = data['Ru']['vY']
            email = data['Ru']['Hv']
  
            if not self.user_model.findUser(email) :
                self.user_model.saveUser(name, email)
                return {"name" : name, "email" : email, "token" : token}
            else :
                return 400

        except ValueError :
            return ValueError
        

        
            