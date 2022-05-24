import React from 'react';
import styled from "styled-components";
import * as QuestionViewPage from './QuestionViewPage'
import { useState } from 'react';
import { Link } from "react-router-dom";


const PageItemUl = styled.ul`
display: flex;
flex-direction: column;
width: 1059px;
height: 657px;

align-items: center;

list-style: none;
text-align: center;
border-radius: 3px;
padding: 1px;
// border-top: 3px solid #186ead;
// border-bottom: 3px solid #186ead;
`;


const Posts = ({ posts, loading }) => {

  const [title, setTitle] = useState("ghi");
  const [seq, setSeq] = useState("");

   function inner(a){
     setTitle(a)
     return title;
  }


 
  return (
    <>
  { loading &&
    <div> loading... </div>
  }
  <PageItemUl className="post">
  { posts.map(post=>( 
    
      // <li className ="post-question-item-li" key={post.id}>
      //   {post.qa_content}
      // </li>
      //{post.qa_title} 
     
      <li className ="post-question-item-li" key={post.qa_seq} >

        <Link to={{
                  pathname: '/qaView',
                  state: {
                    seq: post.qa_seq,
                    title: post.qa_title,
                    user_name: post.user_name,
                    date: post.create_time,
                    content: post.qa_content
                    
                  }
        }}>
       
         <div className="question__title">
            <h3 className="title__text"> {post.qa_title} </h3>
            
       </div>
       <div className="question__footer">
            <span className="writer">{post.user_name}</span>
            <span className="time">{post.create_time}</span>


          {/* 내용 보내기 하고 싶다고~! */}
          

       </div>
       
       {/* {inner(post.qa_title)} */}
       </Link>
       
    </li>
    
    
    ))}
  </PageItemUl>



  </>
  );
};
export default Posts;