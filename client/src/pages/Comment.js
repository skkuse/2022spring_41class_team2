import React from 'react';
import styled from "styled-components";
import * as QuestionViewPage from './QuestionViewPage'
import { useState } from 'react';
import { Link } from "react-router-dom";
import Moment from 'react-moment';

import { call } from '../service/APIService';


const SingleComment = ({viewContent}) => {

    const [cmName, setName] = useState("");
    const [email, setEmail] = useState("");

    call("/user", "GET")
    .then(
      response => {
        setName(response['data']['name']);
        setEmail(response['data']['email']);
      }
    )
  
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
    <>
  {viewContent.map(element =>
                        <div style={{ border: '1px solid #333' }}>

                          <div className="view-comment-header">
                              <span style = {{color: "#333"}}>{cmName}&nbsp;</span>
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
  </>
  );
};
export default SingleComment;