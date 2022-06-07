import React, { useState, useEffect } from 'react';
import '../css/code_page.css';
import { call } from '../service/APIService';
import { Link, useLocation } from "react-router-dom";
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-highlight'
import AceEditor from "react-ace";
import CodePageNav from '../components/CodePageNav';
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/ext-language_tools";

function TestCodePage() {

    const location = useLocation();   
    const [code, setCode] = useState('');
    const [problem, setProblem] = useState('');
    const [result, setResult] = useState('Null');
    const [codeResult, setCodeResult] = useState('Null');
    const [isLecture, setIsLEcture] = useState(true);
    const lecture_content_seq = location.state.data.lecture_content_seq;
    const lecture_content_title = location.state.data.lecture_content_title;
    const data = location.state.data;

    const SendingCode = () => {
        setResult("채점 중 입니다....")
        setCodeResult("실행 중 입니다...")
        call("/lectureContent/" + lecture_content_seq + "/code", "POST", { 'code': code.toString() })
            .then(
                response => {
                    console.log(response)
                    if (response['status_code'] == 400) {
                        setCodeResult(response['data'][0][0])
                        setResult("틀렸습니다")
                    }
                    else {
                        console.log(response['data'][0][1])
                        setCodeResult(response['data'][0][1]);
                        if (response['data'][0][0]) {
                            setResult("맞았습니다");
                        }
                        else {
                            setResult("틀렸습니다");
                        }
                    }

                }
            )
    }

    const getExerciseProblem = () => {
        call('/lectures/lectureContents/' + lecture_content_seq + '/exercise', 'GET')
            .then(
                response => {
                    setProblem(response['data'])
                }
            )
    }

    useEffect(() => {
        getExerciseProblem();
    }, []);

    console.log(code)

    return (
        <div className='TestCode'>

            <div className='code_body'>
                <div className='code_header'>
                    <CodePageNav ></CodePageNav>
                </div>

                <div className='code_nav'>
                    <div className='code_bo1'>{data.lecture_content_title}</div>
                    <button className="button_exec" onClick={SendingCode}>실행</button>

                </div>

                <div className='code_article'>
                    <ReactMarkdown rehypePlugins={[rehypeRaw]} children={problem.toString()}></ReactMarkdown>
                </div>


                <div className='codeEditor'>
                    <AceEditor
                        className='code_form'
                        height='100%'
                        width='100%'

                        mode="python"
                        name="codeInput"
                        onLoad={code}
                        onChange={setCode}
                        fontSize={18}
                        tabSize={2}
                        highlightActiveLine
                        value={code}
                        setOptions={{
                            enableBasicAutocompletion: true,
                            enableLiveAutocompletion: true,
                            enableSnippets: true,
                            showLineNumbers: true,
                            tabSize: 2
                        }}

                    ></AceEditor>
                </div>

                <div className='code_section'>
                    <table>
                        <tr className="tr1">
                            <td className="td1">
                                실행 결과
                            </td>
                        </tr>
                        <tr className="tr2">
                            <td className="td2">

                                {codeResult}

                            </td>
                        </tr>
                    </table>
                    <table>
                        <tr className="tr1">
                            <td className="td1">
                                채점결과
                            </td>
                        </tr>
                        <tr className="tr2">
                            <td className="td2">
                                {result}
                            </td>
                        </tr>
                    </table>

                </div>




            </div>

            <div className='code_footer'>
                <Link to={{
                    pathname: "/qaList",
                    state: {
                        isLecture: isLecture,
                        lecture_content_seq: lecture_content_seq,
                        lecture_content_title: lecture_content_title,

                    }

                }}>
                    <button class="qna">Q&A</button>

                </Link>

            </div>
        </div>
    );
}

export default TestCodePage;