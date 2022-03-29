import os 
from flask_script import Manager 
from app import create_app 

app = create_app(os.getenv("TEST_APP") or "dev") 

manager = Manager(app) 

@manager.command 
def run(): 
    app.run(host='localhost', port='8080', debug=True) 

if __name__ == "__main__": 
    manager.run()
