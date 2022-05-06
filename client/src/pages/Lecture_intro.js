import React, { useState } from 'react';
import '../css/lecture_intro.css'
import { call } from '../service/APIService';

function Lecture_intro() {



    return (
        <div className='Lecture_intro'>

            <body>
                <lec_header>
                    <br></br>
                    <lec_he0 >CrawlLearn</lec_he0>
                    <lec_he1 >강의 대분류</lec_he1>
                    <lec_he2 >강의 소분류</lec_he2>
                </lec_header>

                <lec_nav>
                    <lec_bo1>강의 제목</lec_bo1>
                    <br></br>
                    <lec_bo2>강의 소제목, 짧은 설명</lec_bo2>
                    <br></br>
                    <lec_bo3>좋아요</lec_bo3>
                    <lec_bo4>마지막 업데이트</lec_bo4>

                </lec_nav>

                <lec_article>

                    <button class="button_study">강의 듣기</button>
                    <button class="button_QA">Q&A 작성</button>

                </lec_article>

                <lec_section>


                </lec_section>




            </body>
        </div>
    );
}

export default Lecture_intro;