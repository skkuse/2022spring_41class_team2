class ResponseDTO():
    def __init__(self):
        pass

    def toDTO(self, error, statusCode , data):
        return {"error" : error, "statusCode" : statusCode, "data" : data}