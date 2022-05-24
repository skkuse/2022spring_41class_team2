from datetime import datetime

class CommentService() :
    def __init__(self, user_model, comment_model):
        self.comment_model = comment_model
        self.user_model = user_model
   
    
    def saveComment(self,  user_email, qa_seq, qa_content):
        try :
            user_seq = self.user_model.findUser(user_email)['user_seq']
            qa_createtime = datetime.now()
            self.comment_model.saveComment(user_seq, qa_seq, qa_content, qa_createtime)
            return True
        except Exception as e:
            print(e.args)
            return e.args
    
    def getComment(self, qa_seq):
        try:
            comment_list = self.comment_model.getComment(qa_seq)
            return comment_list
        except Exception as e:

            return e.args