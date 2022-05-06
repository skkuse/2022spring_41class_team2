import React from 'react';
import styled from "styled-components";


const PageItemUl = styled.ul`
position: absolute;
width: 1059px;
height: 657px;
left: 150px;
top: 150px;

list-style: none;
text-align: center;
border-radius: 3px;
padding: 1px;
// border-top: 3px solid #186ead;
// border-bottom: 3px solid #186ead;
`;

const Posts = ({ posts, loading }) => {
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
      <li className ="post-question-item-li" key={post.user_name}>
         <div className="question__title">
            <h3 className="title__text">{post.qa_title}</h3>
       </div>
       <div className="question__footer">
            <span className="writer">{post.user_name}</span>
            <span className="time">{post.create_time}</span>

          {/* {post.qa_content} */}
       </div>
    </li>
    ))}
  </PageItemUl>
  </>
  );
};
export default Posts;

{/* <ul className="post-items-ul">
    { posts.map(post=>(
      <li key={post.id}>
        {post.title}
      </li>
    ))}
  </ul> */}