from datetime import datetime

class QAService() :
    def __init__(self, qa_model):
        self.qa_model = qa_model

    def saveQA(self, lecture_content_seq, user_seq,qa_title, qa_content):
        try:
            create_time = datetime.now()
            if lecture_content_seq != None :
                self.qa_model.saveQA(lecture_content_seq, user_seq, qa_title, qa_content, create_time)
                return True
            else :
                self.qa_model.saveQAWithOutLecture(user_seq, qa_title, qa_content, create_time)
                return True
        except Exception as e:
            print(e.args)
            return False
        
    def getQA(self, qa_seq):
        try:
            qa_content = self.qa_model.getQA(qa_seq)
            return qa_content['qa_content']
        except Exception as e:
            print(e.args)
            return False
    
    def getFreeQnA(self):
        try :
            qa_contents = self.qa_model.getFreeQnA()
            return qa_contents
        except Exception as e:
            return e.args
    
    def getLectureQnA_service(self, lecture_seq, lecuture_content_seq):
        try :
            qa_contents = self.qa_model.getLectureQnA_model(lecture_seq, lecuture_content_seq)
            print(qa_contents)
            return qa_contents
        except Exception as e:
            return e.args