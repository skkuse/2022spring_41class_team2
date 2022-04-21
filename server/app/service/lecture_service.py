import sys
import io

class CodeService() :
    def executeCode(self, code):

        codeOut = io.StringIO()
        codeErr = io.StringIO() 
        sys.stdout = codeOut
        sys.stderr = codeErr
        exec(code)
  
        # restore stdout and stderr
        sys.stdout = sys.__stdout__
        sys.stderr = sys.__stderr__

        result = codeOut.getvalue()
        if codeErr.getvalue != None :
            result = codeOut.getvalue()

            codeOut.close()
            codeErr.close()
            return result, None
        else :
            error = codeErr.getvalue()
            codeOut.close()
            codeErr.close()
            return None, error