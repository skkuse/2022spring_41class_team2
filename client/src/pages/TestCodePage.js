import React, { useState, useEffect } from 'react';
import '../css/practice.css';
import { call } from '../service/APIService';
import { Link , useLocation} from "react-router-dom";
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-highlight'
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/ext-language_tools";

function TestCodePage() {

    const location = useLocation();
    const [code, setCode] = useState('');
    const [codeResult, setCodeResult] = useState('Null');
    const [problem, setProblem] = useState('');

    const [isLecture, setIsLEcture] = useState(true);
    const lecture_content_seq = location.state.lecture_content_seq;

    const SendingCode = () => {
        console.log("호출된다")
        call("/lectures/1/lectureContent/" + lecture_content_seq+ "/code", "POST", { 'code': code.toString() })
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

    const getExerciseProblem = () =>{
        call('/lectures/lectureContents/'+ lecture_content_seq +'/exercise', 'GET')
        .then(
            response =>{
                setProblem(response['data'])
            }
        )
    }

    useEffect(() => {
		getExerciseProblem();
	  },[]);



    return (
        <div className='TestCode'>

            <div className='code_body'>
                <div className='code_header'>
                    <br></br>
                    <div className='code_he0'>CrawlLearn</div>
                    <div className='code_he1'>강의 대분류</div>
                    <div className='code_he2'>강의 소분류</div>
                </div>

                <div className='code_nav'>
                    <div className='code_bo1'>강의 이름</div>
                    <button className="button_exec" onClick="SendingCode">실행</button>

                </div>

                <div className='code_article'>
                    <ReactMarkdown rehypePlugins={[rehypeRaw]}children={problem.toString()}></ReactMarkdown>
                </div>

                <AceEditor
                    className='code_form'
                    placeholder={`code here! python`}
                    mode="python"
                    name="codeInput"
                    onLoad={code}
                    fontSize={18}
                    tabSize={2}
                    highlightActiveLine
                    value=""
                    setOptions={{
                        enableBasicAutocompletion: true,
                        enableLiveAutocompletion: true,
                        enableSnippets: true,
                        showLineNumbers: true,
                        tabSize: 2
                      }}
                    ></AceEditor>

                <div className='code_section'>
                    <table>
                        <tr className="tr1">
                            <td className="td1">
                                결과
                            </td>
                        </tr>
                        <tr className="tr2">
                            <td className="td2">

                                {codeResult}

                            </td>
                        </tr>
                    </table>
                </div>




            </div>

            <div className='code_footer'>
                <Link to ={{
                pathname: "/qaList",
                state: {
                    isLecture: isLecture,
                    lecture_content_seq: lecture_content_seq,

                }
             
                }}>
                    <button class="qna">Q&A</button>
                    
                </Link>

            </div>
        </div>
    );
}

export default TestCodePage;