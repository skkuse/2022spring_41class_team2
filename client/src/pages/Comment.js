import React from 'react';
import '../css/QuestionViewPage.css';
import { Link } from "react-router-dom";
import { useState } from 'react';

function Comment(){

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

    return(

        <div className="view-comment-container">
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

                <div className="view-button-container"> 
                    <button className="view-cancel-button">취소</button>
                    <button className="view-submit-button" onClick = {SendingCm}>등록</button>
                </div>

            </div>
 
        </div> 

    );
}


export default Comment;




 