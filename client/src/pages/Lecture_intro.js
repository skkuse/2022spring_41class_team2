import React, { useEffect, useState } from 'react';
import '../css/lecture_intro.css';
import { call } from '../service/APIService';
import { Link } from "react-router-dom";

function Lecture_intro() {
    const location = useLocation();
    console.log(location);
    const data = location.state.data;

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

    const [lecture_content, set_lecture_content] = useState("");

    const attending_lecture = () => {
        setDisable(false);
        call("/lectures/lectureContents/1", "GET")
            .then(
                response => {
                    console.log(response);
                    console.log(lecture_content);
                    if (response['status_code'] == 400) {
                        
                    }
                    else {
                        set_lecture_content(response['data']);
                    }

                }
            )
    }


    const [disable, setDisable] = useState(true);





    return (
        <div className='Lecture_intro'>

            <body>
                <div class='lec_header'>
                    <br></br>
                    <div class='lec_he0' >CrawlLearn</div>
                    <div class='lec_he1' >강의 대분류</div>
                    <div class='lec_he2' >{data.lecture_seq}</div>
                </div>

                <div class='lec_nav'>
                    <div class='lec_bo1'>{data.lecture_content_title}</div>
                    <br></br>
                    <div class='lec_bo2'>{data.lecture_content}</div>
                    <br></br>
                    <div class='lec_bo3'>{data.like_count}</div>
                    <div class='lec_bo4'> {data.create_time}</div>

                </div>

                <div class='lec_body'>

                    <div class='lec_article'>


                        <button class='clickedStudy' onClick={attending_lecture} >수강 하기</button>

                        <Link to="/codeEdit">
                            <button class="button_QA" disabled={disable}>실습 하기</button>
                        </Link>

                    </div>

                    <div class='lec_section'>
                    <div dangerouslySetInnerHTML={ {__html: lecture_content} }>
                        </div>
                

                    </div>

                </div>




            </body>
        </div>
    );
}

export default Lecture_intro;
