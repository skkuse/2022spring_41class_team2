import re


class LECTURE_MODEL:
    def __init__(self, db_conection):
        self.db_connection = db_conection

    def getLecture(self, lecture_seq):
        SQL = "select * from lecture_content where lecture_seq = %s"
        results = self.db_connection.executeAll(SQL, lecture_seq)
        if results == "None":
            return True
        else :
            return results
   
    def saveLecture(self, lecture_seq, lecture_content_description, like_count, lecture_content_difficulty, lecture_content_metadata, create_time, lecture_answer = None):
       SQL = "INSERT INTO lecture_content(lecture_seq, lecture_content_description, like_count, lecture_content_difficulty, create_time, modification_time, lecture_content, lecture_answer) VALUES(%s, %s, %s, %s, %s, %s ,%s, %s);"
       self.db_connection.executeOne(SQL, [lecture_seq, lecture_content_description, like_count, lecture_content_difficulty, create_time, None, lecture_content_metadata, lecture_answer])
       self.db_connection.commit()
       return 200
    
    def getLectureAnswer(self, lecture_content_seq):
        SQL = "select lecture_answer from lecture_content where lecture_content_seq = %s"
        result = self.db_connection.executeOne(SQL, lecture_content_seq)
        return result

    def userDoneLectureContent(self,lecture_content_seq, user_seq, done):
        SQL = "update attending set attending_done = %s where lecture_content_seq = %s and user_seq = %s;"
        result = self.db_connection.executeAll(SQL, [done, lecture_content_seq, user_seq])
        self.db_connection.commit()
        return result
    
    def getUserLectureContentDone(self,lecture_content_seq, user_seq, done):
        SQL = "select attending_done from attending where lecture_content_seq = %s and user_seq = %s;"
        result = self.db_connection.executeOne(SQL, [lecture_content_seq, user_seq])
        return result
    
    def searchLecutre(self, lecture_seq, search_option):
        SQL = "select * from lecture_content where lecture_seq = %s and lecture_content_title REGEXP %s"
        result = self.db_connection.executeAll(SQL, [lecture_seq, search_option])
        return result
    
    def isAttending(self, lecture_content_seq, email):
        SQL = "select attending_seq from attending where lecture_content_seq = %s and user_seq = (select user_seq from user where user_email = %s)"
        result = self.db_connection.executeAll(SQL, [lecture_content_seq, email])
        return result
    
    def isLiked(self, lecture_content_seq, email):
        SQL = "select user_like from attending where lecture_content_seq = %s and user_seq = (select user_seq from user where user_email = %s)"
        result = self.db_connection.executeAll(SQL, [lecture_content_seq, email])
        return result

    def LikeLectureContent(self, lecture_content_seq, email) :
        SQL = "update attending set user_like = 1 where lecture_content_seq = %s and user_seq = (select user_seq from user where user_email = %s)"
        result = self.db_connection.executeAll(SQL , [lecture_content_seq, email])
        self.db_connection.commit()
        return result
    
    def getLectureFileName(self, lecture_content_seq) :
        SQL = "select lecture_content from lecture_content where lecture_content_seq = %s"
        result = self.db_connection.executeAll(SQL, [lecture_content_seq])
        return result
    
    def attendingLecture(self, lecture_content_seq, email):
        SQL = "insert into attending(lecture_content_seq, user_seq, attending_done, user_like) select %s, user_seq, 0,0 from user where user_email = %s"
        self.db_connection.executeAll(SQL, [lecture_content_seq, email])
        self.db_connection.commit()
        return 