import React, { useState } from 'react';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { call } from '../service/APIService';

function TestCodePage() {

    const [code, setCode] = useState('');
    const [codeResult, setCodeResult] = useState('');

    const SendingCode = () =>{
        call("/executeCode", "POST", {'code' : code.toString()})
        .then(
            response => {
                console.log(response)
                const codeResult = response['codeResult'];
                console.log(codeResult);
                setCodeResult(codeResult);
            }
        )
    }



    return (
        <div>
            <h1> 코드를 입력하세요 </h1>
            <CodeEditor
                value={code}
                language="python"
                placeholder="Please enter Python code."
                onChange={(evn) => setCode(evn.target.value)}
                padding={15}
                style={{
                    fontSize: 12,
                    backgroundColor: "#f5f5f5",
                    fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                }}
            />
            <button onClick={SendingCode}>코드 실행</button>
            <h1>
            {codeResult}
            </h1>
            
        </div>
    );
}

export default TestCodePage;