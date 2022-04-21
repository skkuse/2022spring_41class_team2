# __init__.py 
from urllib import response
from flask import Flask 
from app.config import config_by_name
from .view.lecture_view import create_code_endpoints
from .view.test_view import create_test_endpoints 
from .view.user_view import create_login_endpoints
from .db import db_conection
from .dto.responseDto import ResponseDTO
from .model.user_model import USER_MODEL
from .service.user_service import UserService
from .service.lecture_service import CodeService

def create_app(config_name="prod"): 
    app = Flask(__name__) 
    app.config.from_object(config_by_name[config_name])
    db = db_conection.Database()
    create_test_endpoints(app)
    response_DTO = ResponseDTO()
    # User Endpoint 설정
    
    user_model = USER_MODEL(db)
    user_service = UserService(user_model) 
    create_login_endpoints(app, user_service)

    # Code Endpoint 설정
    
    code_service = CodeService()
    create_code_endpoints(app, code_service)
    return app
