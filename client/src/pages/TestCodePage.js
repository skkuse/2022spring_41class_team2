import React, { useState } from 'react';
import '../css/practice.css'
import CodeEditor from '@uiw/react-textarea-code-editor';
import { call } from '../service/APIService';

function TestCodePage() {

    const [code, setCode] = useState('');
    const [codeResult, setCodeResult] = useState('Null');

    const SendingCode = () => {
        console.log("호출된다")
        call("/lectures/1/lectureContent/1/code", "POST", { 'code': code.toString() })
            .then(
                response => {
                    console.log(response)
                    if (response['status_code'] == 400) {

                        setCodeResult(response['data'][0][0])
                    }
                    else {
                        const codeResult = response['data'][0];
                        if (codeResult) {
                            console.log(codeResult)
                            setCodeResult("맞았습니다");
                        }
                        else {
                            setCodeResult("틀렸습니다");
                        }
                    }

                }
            )
    }



    return (
        <div className='TestCode'>

            <code_body>
                <code_header>
                    <br></br>
                    <code_he0>CrawlLearn</code_he0>
                    <code_he1>강의 대분류</code_he1>
                    <code_he2>강의 소분류</code_he2>
                    <button>컴파일 옵션</button>
                </code_header>

                <code_nav>
                    <code_bo1>강의 이름</code_bo1>
                    <button class="button_dark">dark</button>
                    <button class="button_light">light</button>
                    <button class="button_exec" onClick="SendingCode">실행</button>

                </code_nav>

                <code_article>
                    여기 뭐하는 칸인지 아시는분?



                </code_article>

                <code_form>
                    <code_bo2>파일.py</code_bo2>

                    <CodeEditor class="CodeEditor" value={code} language="python" placeholder="Please enter Python code." onChange={(evn) =>
                        setCode(evn.target.value)}
                        padding={15}
                        style={{
                            fontSize: 12,
                            backgroundColor: "#f5f5f5",
                            fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                            width: "1214px", height: "570px", left: "0px", top: "35px", border: "1px solid #0F194A",

                        }}
                    />
                </code_form>

                <code_section>
                    <table>
                        <tr class="tr1">
                            <td class="td1">
                                결과
                            </td>
                        </tr>
                        <tr class="tr2">
                            <td class="td2">

                                {codeResult}

                            </td>
                        </tr>
                    </table>
                </code_section>




            </code_body>

            <code_footer>
                <button class="qna">Q&A</button>
                <button class="help">도움말</button>

            </code_footer>
        </div>
    );
}

export default TestCodePage;