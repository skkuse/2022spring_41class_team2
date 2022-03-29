# __init__.py 
from flask import Flask 
from app.config import config_by_name
from .view.test_view import create_user_endpoints 

def create_app(config_name="prod"): 
    app = Flask(__name__) 
    app.config.from_object(config_by_name[config_name]) 
    create_user_endpoints(app)
    return app
