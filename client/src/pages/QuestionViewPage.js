import React from 'react';
import '../css/QuestionViewPage.css';
import { Link } from "react-router-dom";

function QuestionViewPage(){


    return (
        <div className = "p">
            <body>
        <header className="view-header">
          <h1>Q&A</h1>
        </header>
        <main>
            <div className="question-body">
              <Link to="/questionList">
                <button className="return-button"> &lt;목록가기</button>
              </Link>
              <div className='view-form-wrapper'>
                <div className="view-question-header-container">
                  <div className="view-title">제목</div>
                    <span className="v_q_item">질문자</span>
                    <span className="v_q_item">작성 날짜</span>
                    <span className="v_q_item">질문 경로</span>
                </div>
                <div className="view-question-body">

                </div>
                <div className="view-comment">
                    <div className="view-comment-header">
                        <span className="v_c_item">작성자</span>
                        <span className="v_c_item">작성 날짜</span>

                    </div>
                    <div className="view-comment-body">


                    </div>
                    <div className="view-assign-button">
                        <button className="view-cancel-button">취소</button>
                        <button className="view-submit-button">등록</button>
                    </div>
                </div>

                
              </div>

            </div>
            {/* <div className="view-comment-container">
            <input className="view-comment" type='text' placeholder='특별한 경로 없음' />

            </div> */}
        </main>
     </body>

        </div>

    );
}
export default QuestionViewPage;
