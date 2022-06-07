import React from 'react';
import '../css/QuestionViewPage.css';
import { Link,useLocation } from "react-router-dom";
import { useState } from 'react';
import { useEffect } from 'react';
import Moment from 'react-moment';

import { call } from '../service/APIService';
import Comment from './Comment';
import { useHistory } from 'react-router-dom';


function QuestionViewPage() {

  const location = useLocation();

  const [cmContent, setCmContent] = useState({
    comment_content: ''
  });
  const [viewContent, setViewContent] = useState([]);
  const [text, setText] = useState('');

  const [cmName, setName] = useState("");
  const [email, setEmail] = useState("");


/*뒤로가기 */ 
let history = useHistory();

const handleChange = (e) => {
  const {name, value} = e.target;
  setText(value);

  setCmContent({
    ...cmContent,
    [name]: value
  }) 
}

      
const SendingCm = () =>{ //댓글 등록 
    
    //local 댓글 쓰기
    setViewContent(viewContent.concat({...cmContent}));

    //comment Post
    call("/qa/"+ location.state.seq +"/comment", "POST", 
    { "comment_content" : cmContent['comment_content']})
      .then(
        response => {
          console.log("댓글 작성", cmContent, email); 
        }
    )

    setText('')//작성 내용 초기화

}

const CancleCm = () => {

  setText('')//작성 내용 초기화

}


useEffect( () => { //no params, 익명 함수 
  function fetchData() {

        call("/qa/"+ location.state.seq +"/comments", "GET")
        .then(
          response => {
              setViewContent(response['data'][0]);
            }
        )
  
  }

  fetchData();

},[]);

// useEffect(() => { setMovies(result) }, [])

console.log(viewContent);

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

                        <button className="return-button" type="button" 
                        onClick={ () => {
                          history.goBack();
                          } } > &lt;목록가기</button>
                
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
                          name='comment_content'
                          value={text}
                          
                          />

                          <div className="view-button-container"> 
                              <button className="view-cancel-button" onClick = {CancleCm}>취소</button>
                              <button className="view-submit-button" onClick = {SendingCm}>등록</button>
                          </div>

                      </div>

                    </div> 

                    {/* <div className='view-comment-container'> */}

                    <ul>
                          <Comment comments={viewContent}></Comment>
                         
              
                         </ul>

                    {/* </div> */}

                </div>{/*view-form-wrapper*/}

              </div>{/*view-container*/}

        </body>

        </div> //className : p

    );
}
export default QuestionViewPage;
