import json

class ResponseDto:
    def create_Response(Error = "", Status_code = "", Data = []) :
        data = {'error': Error, 'status_code': Status_code, "data": Data}
        json_data = json.dumps(data, ensure_ascii=False)
        return json_data
        
