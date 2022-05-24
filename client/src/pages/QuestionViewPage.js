import React from 'react';
import '../css/QuestionViewPage.css';
import { Link } from "react-router-dom";
import { useState } from 'react';
import Comment from '../pages/Comment';



function QuestionViewPage({location}) {

  //질문 경로 값이 있는 경우 출력, 없으면 출력 x
  

  console.log(location.state); //제목이 드디어!





//  /lectures/1/lectureContent/-1/userSeq/2/qa/1/comment
  


    return (
        <div className = "p">
          
          <div id="upper" className="v12_13 v12_13_1">
						<div className="v12_12">
							<div className="v5_26">
								<span></span>
							</div>
						</div>
					</div>

          <header className="mp_h_1">
              <div className="mp_c_1">
                <span className="v5_33">Q&A</span>
                <br></br>
                <br></br>
              </div>
          </header>

        <body>
              <div className="question-body">

                      <Link to="/qaList">
                        {/* <div className="button-nav"> */}
                            <button className="return-button" type="button"> &lt;목록가기</button>
                        {/* </div> */}
                        </Link>
                
                  <div className='view-container'>

                    <div className="view-question-header-container">
                            <div className="view-title">{location.state.title} {/*제목*/}</div>
                            <span className="v_q_item">{location.state.user_name}</span>  {/*작성자*/}
                            <span className="v_q_item">{location.state.date}</span> {/*작성날짜*/}
                            <span className="v_q_item">질문 경로</span>
                    </div>


                    <div className="view-question-body">
                    {location.state.content} {/*작성내용*/}
                    </div>
                    <Comment></Comment>

                   
                </div>{/*view-form-wrapper*/}

              </div>{/*view-container*/}
              

        </body>

        </div> //className : p

    );
}
export default QuestionViewPage;



 {/* <div className="view-comment-container">
                <input className="view-comment" type='text' placeholder='특별한 경로 없음' />

                </div> */}