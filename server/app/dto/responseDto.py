class ResponseDTO():
 
    def toDTO(self, error, statusCode , data):
        return {"error" : error, "statusCode" : statusCode, "data" : data}