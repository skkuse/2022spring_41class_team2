import React from 'react';
import '../css/QuestionViewPage.css';
import { Link } from "react-router-dom";
import { useState } from 'react';



function QuestionViewPage({location}) {

  //질문 경로 값이 있는 경우 출력, 없으면 출력 x
  

  console.log(location.state); //제목이 드디어!

  const [cmContent, setCmContent] = useState({
    title: '',
    content: ''
  });

  const getValue = e => {
    const { name, value } = e.target;
    setCmContent({
      ...cmContent,
      [name]: value
    })
    console.log(cmContent);
  };

  
  const SendingCm = () =>{
   
    alert('댓글 작성 완료')
      
  }


    return (
        <div className = "p">
            <body>
        <header className="view-header">
          <h1>Q&A</h1>
        </header>
        <main>
            <div className="question-body">
              <Link to="/qaList">
                <button className="return-button"> &lt;목록가기</button>
              </Link>
              <div className='view-form-wrapper'>
                <div className="view-question-header-container">
                  <div className="view-title">{location.state.title} {/*제목*/}
                  </div>
                    <span className="v_q_item">{location.state.user_name}</span>  {/*작성자*/}
                    <span className="v_q_item">{location.state.date}</span> {/*작성날짜*/}
                    
                    <span className="v_q_item">질문 경로</span>
                </div>
                <div className="view-question-body">
                {location.state.content} {/*작성내용*/}

                </div>
                <div className="view-comment">
                    <div className="view-comment-header">
                        <span className="v_c_item">작성자</span> {/*작성자랑 날짜 강의에서부터 넣어와야함 */}
                        <span className="v_c_item">작성 날짜</span>
                    </div>
                    <div className="view-comment-body">

                    <input className="view-comment-input"
                      type='text'
                      placeholder='내용이다'
                      onChange={getValue}
                      name='comment'
                    />


                    </div>
                    <div className="view-assign-button">
                        <button className="view-cancel-button">취소</button>
                        <button className="view-submit-button" onClick = {SendingCm}>등록</button>
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

