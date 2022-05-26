class USER_MODEL:
    def __init__(self, db_conection):
        self.db_connection = db_conection

    def findUser(self,email):
        SQL = "select * from user where user_email = %s"
        result = self.db_connection.executeOne(SQL, email)
        
        if result == "None":
            return True
        else :
            return result
   
    def saveUser(self, name, email):
       SQL = "INSERT INTO user(user_name, user_email) VALUES(%s, %s);"
       self.db_connection.executeOne(SQL, [name, email])
       self.db_connection.commit()
       return 200
    
    def getAttendingLecture(self, email):
        SQL = "select lecture_content_title from lecture_content where lecture_content_seq in (select lecture_content_seq from attending where user_seq = (select user_seq from user where user_email = %s))"
        result = self.db_connection.executeAll(SQL, [email])
        return result
    
    def getlikeLecture(self, email):
        SQL = "select lecture_content_title from lecture_content where lecture_content_seq in (select lecture_content_seq from attending where user_like = 1 and user_seq = (select user_seq from user where user_email = %s))"
        result = self.db_connection.executeAll(SQL,[email])
        return result

    def getmyQA(self, email):
        SQL = "select qa_title from qa where user_seq = (select user_seq from user where user_email = %s);"
        result = self.db_connection.executeAll(SQL,[email])
        return result
    
    def fix_name(self, email, fixed_name):
        SQL = "update user set user_name = %s where user_email = %s"
        result = self.db_connection.executeAll(SQL, [fixed_name, email])
        self.db_connection.commit()
        return 200

    def isUserDoneLecture(self, email, lecture_content_seq):
        SQL = "select attending_done from attending where lecture_content_seq = %s and user_seq = (select user_seq from user where user_email = %s);"
        result = self.db_connection.executeAll(SQL, [lecture_content_seq, email])
        print(result)
        return result