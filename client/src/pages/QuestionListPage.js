import React from 'react';
import '../css/QuestionListPage.css';
import { Link } from "react-router-dom";
import { useState } from "react";

function QuestionListPage() {
  const [searchTerm, setSearchTerm] = useState("");


  

  return (
    <div className="QuestionListPage">
      <body>
        <header>
          <div className = "list-question-header">
                  <div className = "question-header_content">
                      <h2 className= "question-header_title">CrawlLearn</h2>
                      <p className = "question-header_sub-title">파이썬 기초부터 크롤링 심화까지! 모든 강의와 실습을 한번에 즐겨보세요.</p>
                  </div>
          </div>   
          
        </header>

        <main>
        <nav className="navbar">
              <div className="navbar-menu">
                    <a className="navbar-item_lecture" href="#home">강의</a>
                    <a className="navbar-item_qna" href="#news">Q&A</a>
              </div>
            </nav>   
                <div className = "question-body_content">
                <Link to ="/">
                <button className="write-button">작성하기</button>
                </Link>
                {/* <input
                  type = "text"
                  placeholder="Search"
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                  }}
                  {dummyData.filter((val) =>{
                    if(searchTerm ==""){
                      return val
                    }else if (val.title.toLowerCase().includes(searchTerm.toLocaleLowerCase())){
                      return val
                    }

                  }).map(data => {
                    return <p>dummyData.title</p>
                  })
                }
                /> */}
                    <div className = "question-list-container">
                        <ul className = "question-list">
                          <Link to="/questionView">
                            <li className = "question-container">
                                <div className="question__info"> 
                                    <div className="question__title">
                                        <h3 className="title__text">제목</h3>
                                    </div>
                        
                                    <div className="question__footer">
                                        <span className="writer">질문자</span>
                                        <span className="time">시각</span>
                                    </div>
                                </div>
                            </li>
                          </Link>
                        </ul>
                    </div>
                </div>
        </main>
      </body>
    </div>
  );
}

export default QuestionListPage;
