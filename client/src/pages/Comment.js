import React, { useEffect } from 'react';
import styled from "styled-components";
import * as QuestionViewPage from './QuestionViewPage'
import { useState } from 'react';
import { Link } from "react-router-dom";
import Moment from 'react-moment';

import { call } from '../service/APIService';

// const PageItemUl = styled.ul`
// display: flex;
// flex-direction: column;
// width: 1059px;
// height: 657px;

// align-items: center;

// list-style: none;
// text-align: center;
// border-radius: 3px;
// padding: 1px;
// // border-top: 3px solid #186ead;
// // border-bottom: 3px solid #186ead;
// `;


const Comment = ({comments}) => {

    const [cmName, setName] = useState("");
    const [email, setEmail] = useState("");

    const loadUserData = () => {

      call("/user", "GET")
      .then(
        response => {
          setName(response['data']['name']);
          setEmail(response['data']['email']);
        }
      )

    }

    useEffect(() => {
      loadUserData();
    }, []);
  
  const displayCreatedAt = (createdAt) => {
    let startTime = new Date(createdAt);
    let nowTime = Date.now();
    if (parseInt(startTime - nowTime) > -20000) { //5시간전
      return <Moment format="방금 전">{startTime}</Moment>;
    }
    if (parseInt(startTime - nowTime) < -86400000) {
      return <Moment format="MMM D일">{startTime}</Moment>;
    }
    if (parseInt(startTime - nowTime) > -86400000) {
      return <Moment fromNow>{startTime}</Moment>;
    }
  };
  console.log(comments);
 
  return (
    <>
 <ul className="view-comment-container">
  {comments && comments.map(element =>
                    <li key={element.comment_seq}>
                        <div style={{ border: '1px solid #333' }} >

                          <div className="view-comment-header">
                              <span style = {{color: "#333"}}>{element.user_name}&nbsp;</span>
                              <span style = {{color: "#333"}}>{displayCreatedAt(element.comment_createtime)}</span>
                          </div>
                          
                          <div className="view-comment-body">
                            {element.comment_content.split("\n").map((line) => { 
                              return (
                                <span>
                                  {line}
                                  <br />
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      </li>
                      )}
</ul>
  </>
  );
};
export default Comment;