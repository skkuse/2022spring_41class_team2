import re


class QA_MODEL:
    def __init__(self, db_conection):
        self.db_connection = db_conection

    def saveQA(self, lecture_content_seq, user_seq, qa_title, qa_content, create_time):
        SQL = "insert into qa(lecture_content_seq, user_seq, qa_title, qa_content, create_time) values(%s, %s, %s, %s, %s)"
        result = self.db_connection.executeAll(SQL, [lecture_content_seq, user_seq, qa_title, qa_content, create_time])
        self.db_connection.commit()
        return result
    
    def saveQAWithOutLecture(self,user_seq, qa_title, qa_content, create_time):
        SQL = "insert into qa(user_seq, qa_title, qa_content, create_time) values( %s, %s, %s, %s)"
        result = self.db_connection.executeAll(SQL, [user_seq, qa_title, qa_content, create_time])
        self.db_connection.commit()
        return result

    def getQA(self, qa_seq):
        SQL = "select qa_content from qa where qa_seq = %s"
        result = self.db_connection.executeOne(SQL, qa_seq)
        return result

    def getFreeQnA(self):
        SQL = "select user_name, qa_seq, qa_title, qa_content, create_time, lecture_content_seq from qa join user on user.user_seq = qa.user_seq"
        result = self.db_connection.executeAll(SQL)
        return result

    def getLectureQnA_model(self, lecuture_content_seq):
        print(lecuture_content_seq)
        SQL = "select user_name, qa_title, qa_content, create_time from qa left join user on user.user_seq = qa.user_seq where qa.lecture_content_seq = %s;"
        result = self.db_connection.executeAll(SQL, [lecuture_content_seq])
        print(result)
        return result