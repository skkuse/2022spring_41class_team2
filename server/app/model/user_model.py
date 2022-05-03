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
