import React, { useEffect, useState } from 'react';
import '../css/lecture_intro.css';
import { call } from '../service/APIService';
import { Link } from "react-router-dom";

function Lecture_intro() {

    /*const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        async function fetchData() {
            setLoading(true);



            call("/qna", "GET")
                .then(
                    response => {
                        setPosts(response['data'][0])
                    }
                )

            setLoading(false);

        }
        fetchData();
    }, []);*/



    const [disable, setDisable] = useState(true);





    return (
        <div className='Lecture_intro'>

            <body>
                <div class='lec_header'>
                    <br></br>
                    <div class='lec_he0' >CrawlLearn</div>
                    <div class='lec_he1' >강의 대분류</div>
                    <div class='lec_he2' >강의 소분류</div>
                </div>

                <div class='lec_nav'>
                    <div class='lec_bo1'>강의 제목</div>
                    <br></br>
                    <div class='lec_bo2'>강의 소제목, 짧은 설명</div>
                    <br></br>
                    <div class='lec_bo3'>좋아요</div>
                    <div class='lec_bo4'> ,,,, </div>

                </div>

                <div class='lec_body'>

                    <div class='lec_article'>


                        <button class='clickedStudy' onClick={() => setDisable(false)} >수강 하기</button>

                        <Link to="/codeEdit">
                            <button class="button_QA" disabled={disable}>실습 하기</button>
                        </Link>

                    </div>

                    <div class='lec_section'>
                        강의정보불러오기

                    </div>

                </div>




            </body>
        </div>
    );
}

export default Lecture_intro;