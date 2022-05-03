import React, { useState } from 'react';
import '../css/practice.css'
import CodeEditor from '@uiw/react-textarea-code-editor';
import { call } from '../service/APIService';

function TestCodePage() {

    const [code, setCode] = useState('');
    const [codeResult, setCodeResult] = useState('');

<<<<<<< HEAD
    const SendingCode = () => {
        console.log(code)
        call("/executeCode", "POST", { 'code': code.toString() })
            .then(
                response => {

                    const codeResult = response['codeResult'];
                    console.log(codeResult);
                    setCodeResult(codeResult);
                }
            )
=======
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
>>>>>>> dev
    }



    return (
        <div>
            <body>
                <header>
                    <br></br>
                    <he0>CrawlLearn</he0>
                    <he1>강의 대분류</he1>
                    <he2>강의 소분류</he2>
                    <button>컴파일 옵션</button>
                </header>

                <nav>
                    <bo1>강의 이름</bo1>
                    <button class="button_dark">dark</button>
                    <button class="button_light">light</button>
                    <button class="button_exec" onclick="SendingCode">실행</button>

                </nav>

                <article>
                    여기 뭐하는 칸인지 아시는분?



                </article>

                <form>
                    <bo2>파일.py</bo2>

                    <CodeEditor class="CodeEditor" value={code} language="python" placeholder="Please enter Python code." onChange={(evn) =>
                        setCode(evn.target.value)}
                        padding={15}
                        style={{
                            fontSize: 12,
                            backgroundColor: "#f5f5f5",
                            fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                            width: "1094px", height: "570px", left: "0px", top: "35px", border: "1px solid #0F194A",

                        }}
                    />
                </form>

                <section>
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
                </section>




            </body>

            <footer>
                <button class="qna">Q&A</button>
                <button class="help">도움말</button>

            </footer>
        </div>
    );
}

export default TestCodePage;