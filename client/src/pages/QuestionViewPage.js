import React from 'react';
import '../css/QuestionViewPage.css';
import { Link } from "react-router-dom";
import { useState } from 'react';
import { useEffect } from 'react';
import Moment from 'react-moment';

import { call } from '../service/APIService';


function QuestionViewPage({location}) {
  
  // console.log(location.state); //제목이 드디어!

const [cmContent, setCmContent] = useState({
    comment: ''
});

const getValue = e => {
    const { name, value } = e.target;


    setCmContent({
      ...cmContent,
      [name]: value
    }) 

    
  }; 
 
  const [viewContent, setViewContent] = useState([]);

  const [cmName, setName] = useState("");
  const [email, setEmail] = useState("");

      
const SendingCm = () =>{
    
   
    setViewContent(viewContent.concat({...cmContent}));

    call("/user", "GET")
      .then(
        response => {
            setName(response['data']['name']);
             setEmail(response['data']['email']);
            console.log(response);
        }
      )
    
    // call("/qa/"+ location.state.seq +"/comment", "POST",
    // { "comment_content" : cmContent , "user_email" : email})
    //   .then(
    //     response => {
    //       console.log(cmContent); 
    //     }
    // )


}

  const displayCreatedAt = (createdAt) => {
    let startTime = new Date(createdAt);
    let nowTime = Date.now();
    if (parseInt(startTime - nowTime) > -60000) {
      return <Moment format="방금 전">{startTime}</Moment>;
    }
    if (parseInt(startTime - nowTime) < -86400000) {
      return <Moment format="MMM D일">{startTime}</Moment>;
    }
    if (parseInt(startTime - nowTime) > -86400000) {
      return <Moment fromNow>{startTime}</Moment>;
    }
  };


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
                          onChange={getValue}
                          name='comment'
                          
                          />

                          <div className="view-button-container"> 
                              <button className="view-cancel-button" >취소</button>
                              <button className="view-submit-button" onClick = {SendingCm}>등록</button>
                          </div>

                      </div>

                    </div> 

                    <div className='view-comment-container'>

                      {viewContent.map(element =>
                        <div style={{ border: '1px solid #333' }}>

                          <div className="view-comment-header">
                              <span style = {{color: "#333"}}>{cmName}</span>
                               <span style = {{color: "#333"}}>{displayCreatedAt(Date())}</span>
                          </div>
                          
                          <div className="view-comment-body">
                            {element.comment.split("\n").map((line) => { 
                              return (
                                <span>
                                  {line}
                                  <br />
                                </span>
                              );
                            })}
                          </div>

                          


                        </div>
                      )}
                    </div>

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