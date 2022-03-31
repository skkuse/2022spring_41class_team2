import os 
from flask_script import Manager 
from flask_cors import CORS
from app import create_app 

app = create_app(os.getenv("TEST_APP") or "dev")
CORS(app) 

manager = Manager(app) 

@manager.command 
def run(): 
    app.run(host='localhost', port='8080', debug=True) 

if __name__ == "__main__": 
    manager.run()
