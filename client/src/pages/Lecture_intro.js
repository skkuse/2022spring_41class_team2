import React, { useEffect, useState } from 'react';
import '../css/lecture_intro.css';
import { call } from '../service/APIService';
import { Link, useLocation } from "react-router-dom";
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'

function Lecture_intro() {
    const location = useLocation();
    const data = location.state.data;

    const [lecture_content, set_lecture_content] = useState("");
    const [completed, setcompleted] = useState("");
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

    



    /*async function fetchData() {
        let queryString = '/lectures/'+data.lecture_seq+'/lectureContent/' + data.lecture_content_seq + '/userSeq/' + +'/1';
        call(queryString, "GET")
            .then(
                response => {
                    setlectures(response['data'])
                    setLectureSort("")
                }
            )
        setLoading(false);
    }*/

    const getUserInfo2 = () => {
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
                        console.log(data.lecture_content_title)
                    }
                }
            ).catch(
                error => {
                    console.log(error)
                }
            )
    }

    useEffect(() => {
        getUserInfo2();
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
        }

    }, [attending]);


    const [disable, setDisable] = useState(true);


    var sequence = data.lecture_seq;


    return (
        <div className='Lecture_intro'>
            <div className='lec_header'>
                <br></br>
                <div className='lec_he0' ><p>CrawlLearn</p></div>
                <div className='lec_he2' >{
                    {
                        1: <p>Basic Python</p>,
                        2: <p>Web Page Structure</p>,
                        3: <p>Web Crawling</p>
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
                        getUserInfo2()
                    }}>수강 하기</button>

                    <button className="button_QA" disabled={disable} ><Link to={{
                        pathname: "/codeEdit",
                        state: {
                            lecture_content_seq: data.lecture_content_seq,
                        }
                    }}>
                        실습 하기
                    </Link></button>
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