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
