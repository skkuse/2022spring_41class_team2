# config.py 
import os 
base_dir = os.path.abspath(os.path.dirname(__file__)) 
class Config(object): 
    SECRET_KEY = os.urandom(16) 
    DEBUG = False 
    
class DevelopmentConfig(Config): 
    DEBUG = True 
    
class ProductionConfig(Config): 
    DEBUG = False 

config_by_name = dict( 
    dev=DevelopmentConfig, 
    prod=ProductionConfig, 
    ) 
    
key = Config.SECRET_KEY
