import React, { useEffect, useState } from 'react';
import '../css/lecture_intro.css';
import { call } from '../service/APIService';
import { Link, useLocation } from "react-router-dom";

function Lecture_intro() {
    const location = useLocation();
    console.log(location);
    const data = location.state.data;



    const [lecture_content, set_lecture_content] = useState("");
    const [disable, setDisable] = useState(true);

    const attending_lecture = () => {
        setDisable(false);
        call("/lectures/lectureContents/" + data.lecture_content_seq, "GET")
            .then(
                response => {
                    console.log(response);
                    console.log(lecture_content);
                    if (response['status_code'] === 400) {

                    }
                    else {
                        set_lecture_content(response['data']);
                    }

                }
            )
    }





    /* const [lecture_seq, set_lecture_seq] = useState("whyrano");
 
     const mapping_lecture_seq = () => {
 
         call("/lectures/lectureContents/" + data.lecture_seq, "GET", data.lecture_seq)
             .then(
                 response => {
                     console.log(response);
                     console.log(data.lecture_seq);
 
                     let sequence = data.lecture_seq;
 
                     if (sequence === 1) {
                         set_lecture_seq("Basic Python");
                     }
                     else if (sequence === 2) {
                         set_lecture_seq("Web Page Structure");
                     }
                     else {
                         set_lecture_seq("Web Crawling");
                     }
                 }
             )
     }*/

    var sequence = data.lecture_seq;

    return (
        <div className='Lecture_intro'>

            <body>
                <div className='lec_header'>
                    <br></br>
                    <div className='lec_he0' >CrawlLearn</div>
                    <div className='lec_he1' >강의 대분류</div>
                    <div className='lec_he2' >{
                        {
                            1: <p>Basic Python</p>,
                            2: <p>Web Page Structure</p>,
                            3: <p>Web Crawling</p>
                        }[sequence]
                    }</div>
                </div>

                <div className='lec_nav'>
                    <div className='lec_bo1'>{data.lecture_content_title}</div>
                    <br></br>
                    <div className='lec_bo2'>{data.lecture_content}</div>
                    <br></br>
                    <div className='lec_bo3'>{data.like_count}</div>
                    <div className='lec_bo4'> {data.create_time}</div>

                </div>

                <div className='lec_body'>

                    <div className='lec_article'>


                        <button className='clickedStudy' onClick={attending_lecture} >수강 하기</button>

                        <Link to="/codeEdit">
                            <button className="button_QA" disabled={disable}>실습 하기</button>
                        </Link>

                    </div>

                    <div className='lec_section'>
                        <div dangerouslySetInnerHTML={{ __html: lecture_content }}>
                        </div>


                    </div>

                </div>




            </body>
        </div>
    );
}

export default Lecture_intro;