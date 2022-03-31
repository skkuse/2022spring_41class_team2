# __init__.py 
from urllib import response
from flask import Flask 
from app.config import config_by_name
from .view.code_view import create_code_endpoints
from .view.test_view import create_test_endpoints 
from .view.user_view import create_login_endpoints
from .dto.responseDto import ResponseDTO
from .service.user_service import UserService
from .service.code_service import CodeService

def create_app(config_name="prod"): 
    app = Flask(__name__) 
    app.config.from_object(config_by_name[config_name])

    create_test_endpoints(app)
    # User Endpoint 설정
    response_DTO = ResponseDTO()
    user_service = UserService() 
    
    create_login_endpoints(app, user_service, response_DTO)

    # Code Endpoint 설정
    
    code_service = CodeService()
    create_code_endpoints(app, code_service)
    return app
