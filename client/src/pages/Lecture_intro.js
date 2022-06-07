import React, { useEffect, useState } from 'react';
import '../css/lecture_intro.css';
import { call } from '../service/APIService';
import { Link, useLocation } from "react-router-dom";
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import LectureIntroNav from '../components/LectureIntroNav'

function Lecture_intro() {
    const location = useLocation();
    const data = location.state.data;

    //console.log(data.lecture_content_title);

    const [lecture_content, set_lecture_content] = useState("");
    const [haveExercise, setHaveExercise] = useState(true)
    const [disable, setDisable] = useState(false);
    const [attending, setattending] = useState(0);
    const attending_lecture = () => {
        setDisable(false);
        call("/lectures/lectureContents/" + data.lecture_content_seq, 'PUT')
            .then(
                response => {
                    console.log(response)
                }
            )
        call("/lectures/lectureContents/" + data.lecture_content_seq, "GET")
            .then(
                response => {

                    if (response['status_code'] == 400) {

                    }
                    else {

                        set_lecture_content(response['data']);
                    }

                }
            )
    }

    const user_attending_info = () => {
        var token = sessionStorage.getItem("ACCESS_TOKEN");
        if (token == null) {
            window.location.href = '/login';
        }
        call("/user/info", "GET")
            .then(
                response => {
                    if (response['data']['attending_lecture']) {
                        if (response['data']['attending_lecture'].includes(data.lecture_content_title)) { setattending(1) }
                        console.log(response['data']['attending_lecture'])
                      //  console.log(data.lecture_content_title)
                    }
                }
            ).catch(
                error => {
                    console.log(error)
                }
            )
    }

    useEffect(() => {
        user_attending_info();
    }, []);

    useEffect(() => {
        setDisable(false);
        if (attending != 0) {
            call("/lectures/lectureContents/" + data.lecture_content_seq, "GET")
                .then(
                    response => {

                        if (response['status_code'] == 400) {

                        }
                        else {
                            set_lecture_content(response['data']);
                        }

                    }
                )
            call('/lectures/lectureContents/' + data.lecture_content_seq + '/exercise', 'GET')
                .then(
                    response => {
                        if(response['data'][0] == null){
                            setDisable(true);
                        }
                        
                    }
                )
        }

    }, [attending]);

    var sequence = data.lecture_seq;


    return (
        <div className='Lecture_intro'>
            <div className='lec_header'>
                <br></br>
                <div className='lec_he0' >
                    <LectureIntroNav></LectureIntroNav>
                </div>
                <div className='lec_he2' >{
                    {
                        1: <p>강의 종류 : Basic Python</p>,
                        2: <p>강의 종류 : Web Page Structure</p>,
                        3: <p>강의 종류 : Web Crawling</p>
                    }[sequence]
                }</div>
            </div>

            <div className='lec_nav'>
                <div className='lec_bo1'><p>{data.lecture_content_title}</p></div>

                <div className='lec_bo2'><p>{data.lecture_content_description}</p></div>
                <div className='lec_bo33'>
                    <div><p className='lec_bo3'>좋아요 갯수 :{data.like_count}</p></div>
                    <div><p className='lec_bo4'>강의 제작 날짜 : {data.create_time}</p></div>
                </div>


            </div>

            <div className='lec_body'>

                <div className='lec_article'>

                    
                    <button className='clickedStudy' onClick={() => {
                        attending_lecture()
                        user_attending_info()
                    }}>수강 하기</button>
                    <Link to={{
                            pathname: "/codeEdit",
                            state: {
                                data:data
                            }
                        }}>
                    <button className="button_QA" disabled={disable} >
                        
                            실습 하기
                        
                    </button>
                    </Link>
                    <div className="userState">{attending === 0 ? "수강 전" : "수강 중"}</div>
                </div>

                <div className='lec_section'>
                    <div className='lec_section2'>
                        <ReactMarkdown rehypePlugins={[rehypeRaw]} children={lecture_content.toString()}></ReactMarkdown>
                    </div>

                </div>

            </div>

        </div>
    );
}

export default Lecture_intro;