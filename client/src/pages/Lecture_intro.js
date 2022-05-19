import React, { useState } from 'react';
import '../css/lecture_intro.css';
import { useLocation } from 'react-router-dom';
import { call } from '../service/APIService';

const Lecture_intro = () => {

    const location = useLocation();
    console.log(location);
    const data = location.state.data;

    return (
        <div className='Lecture_intro'>
                <div>
                    <div className="lec_header">
                        <br></br>
                        <div className="lec_he0" >CrawlLearn</div>
                    <div className="lec_he2" >{data.lecture_seq}</div>
                    </div>

                    <div className="lec_nav">
                    <span className="lec_bo1">{data.lecture_content_title}</span>
                        <br></br>
                    <span className="lec_bo2">{data.lecture_content}</span>
                        <br></br>
                    <span className="lec_bo3">{data.like_count}</span>
                    <span className="lec_bo4">{data.create_time}</span>

                    </div>

                    <div className="lec_article">

                        <button className="button_study">강의 듣기</button>
                        <button className="button_QA">Q&A 작성</button>

                    </div>

                    <div className="lec_section">
                    {data.lecture_content_description }

                    </div>

                </div>
        </div>




    );
}

export default Lecture_intro;
