import React from 'react';
import '../css/QuestionViewPage.css';
import { Link,useLocation } from "react-router-dom";
import { useState } from 'react';
import { useEffect } from 'react';
import Moment from 'react-moment';

import { call } from '../service/APIService';
import Comment from './Comment';


function QuestionViewPage() {

  const location = useLocation();

  const [cmContent, setCmContent] = useState({
    comment: ''
  });
  const [viewContent, setViewContent] = useState([]);
  const [text, setText] = useState('');

  const [cmName, setName] = useState("");
  const [email, setEmail] = useState("");



const handleChange = (e) => {
  const {name, value} = e.target;
  setText(value);

  setCmContent({
    ...cmContent,
    [name]: value
  }) 
}

      
const SendingCm = () =>{ //댓글 등록 
    
    setViewContent(viewContent.concat({...cmContent}));

    call("/user", "GET")
      .then(
        response => {
            setName(response['data']['name']);
             setEmail(response['data']['email']);
            console.log(response);
        }
      )

    setText('')//작성 내용 초기화

    //comment Post
    call("/qa/"+ location.state.seq +"/comment", "POST", 
    { "comment_content" : cmContent , "user_email" : email})
      .then(
        response => {
          console.log(cmContent); 
        }
    )
    // lectures/lectureContents/{contents_seq}/qa
    //lecture_content_seq 별로 질문 가져오기 

}

const CancleCm = () => {

  setText('')//작성 내용 초기화

}


useEffect( () => { //no params, 익명 함수 
  function fetchData() {

        call("/qa/"+ location.state.seq +"/comments", "GET")
        .then(
          response => {
              setViewContent(response['data'][0])
              console.log("댓글 받아오기");
          }
        )
  
  }
  fetchData();
},[]);



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
              <div className="viewPage">

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
                    <div className="comment-container">
                      <div className="comment-header">
                          <span className="v_c_item">Comment</span> {/*작성자랑 날짜 강의에서부터 넣어와야함 */}
                      </div>
                      <div className="comment-body">

                          <textarea className="view-comment-input"
                          type='text'
                          placeholder='댓글 작성'
                          onChange={handleChange}
                          name='comment'
                          value={text}
                          
                          />

                          <div className="view-button-container"> 
                              <button className="view-cancel-button" onClick = {CancleCm}>취소</button>
                              <button className="view-submit-button" onClick = {SendingCm}>등록</button>
                          </div>

                      </div>

                    </div> 

                    <div className='view-comment-container'>

                    <Comment viewContent={viewContent}></Comment>
                    </div>

                </div>{/*view-form-wrapper*/}

              </div>{/*view-container*/}

        </body>

        </div> //className : p

    );
}
export default QuestionViewPage;
