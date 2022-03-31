from flask_login import UserMixin
 
from ..db.db import get_db
 
 
class ResponseDTO():
    def __init__(self, id_, name, email, profile_pic):
        self.id = id_
        self.name = name
        self.email = email
 
 
    def toDTO(error = "", statusCode = 200, data = ""):
        return {"error" : error, "statusCode" : statusCode, "data" : data}