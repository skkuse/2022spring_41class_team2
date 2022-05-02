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
   
    def saveLecture(self, lecture_seq, lecture_content_description, like_count, lecture_content_difficulty, lecture_content_metadata, create_time):
       SQL = "INSERT INTO lecture_content(lecture_seq, lecture_content_description, like_count, lecture_content_difficulty, create_time, modification_time, lecture_content, lecture_answer) VALUES(%s, %s, %s, %s, %s, %s ,%s, %s);"
       self.db_connection.executeOne(SQL, [lecture_seq, lecture_content_description, like_count, lecture_content_difficulty, create_time, None, lecture_content_metadata, None])
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

    def saveQA(self, lecture_content_seq, user_seq, qa_title, qa_content, create_time):
        SQL = "insert into qa(lecture_content_seq, user_seq, qa_title, qa_content, create_time) values(%s, %s, %s, %s, %s)"
        result = self.db_connection.executeAll(SQL, [lecture_content_seq, user_seq, qa_title, qa_content, create_time])
        self.db_connection.commit()
        return result