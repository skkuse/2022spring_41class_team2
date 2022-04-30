import sys
import io
from datetime import datetime
from werkzeug.utils import secure_filename
from pathlib import Path
import os
import json

class LectureService() :
    def __init__(self, lecture_model):
        self.dirname = os.path.join(os.path.dirname(__file__), 'buffer')
        self.lecture_model = lecture_model
    def executeCode(self, code):

        codeOut = io.StringIO()
        codeErr = io.StringIO() 
        sys.stdout = codeOut
        sys.stderr = codeErr
        exec(code)
  
        # restore stdout and stderr
        sys.stdout = sys.__stdout__
        sys.stderr = sys.__stderr__

        result = codeOut.getvalue()
        if codeErr.getvalue != None :
            result = codeOut.getvalue()

            codeOut.close()
            codeErr.close()
            return result, None
        else :
            error = codeErr.getvalue()
            codeOut.close()
            codeErr.close()
            return None, error
    
    def saveLecture(self, data):
        lecture_seq = data['lecture_seq']
        lecture_content_description = data['lecture_content_description']
        lecture_content_difficulty = data['lecture_content_difficulty']
        create_time = datetime.now()
        file_path = os.path.join(self.dirname, data['lecture_content'])
        if os.path.isfile(file_path):
            lecture_content_metadata = secure_filename(data['lecture_content'])
            self.lecture_model.saveLecture(
                lecture_seq, 
                lecture_content_description, 
                0, 
                lecture_content_difficulty, 
                lecture_content_metadata, 
                create_time)
            return 200
        else :
            return 400
    
    def getLecture(self, lecture_seq):
        try:
            results = self.lecture_model.getLecture(lecture_seq)
            for result in results :
                result['lecture_content'] = result['lecture_content'].decode('utf-8')
            return results
        except Exception:
            return 400
        
        