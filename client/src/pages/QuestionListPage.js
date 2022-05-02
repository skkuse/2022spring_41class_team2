import React from 'react';
import '../css/QuestionListPage.css';
import { Link } from "react-router-dom";

function QuestionListPage() {


  return (
    <div className="App">
      <body>
        <header>
          <section className = "question-header">
                  <div className = "question-header_content">
                      <h2 className= "question-header_title">CrawlLearn</h2>
                      <p className = "question-header_sub-title">파이썬 기초부터 크롤링 심화까지! 모든 강의와 실습을 한번에 즐겨보세요.</p>
                  </div>
          </section>
            <nav className="navbar">
              <div className="navbar-menu">
                <div className="navbar-container">
                    <a className="navbar-item" href="#home">강의</a>
                    <a className="navbar-item" href="#news">Q&A</a>
                  <div className="navbar-right">
                    <Link to="./qnaMain">
                      <button className="write-button">작성하기</button>
                    </Link>
                  </div>
                </div>
              </div>
            </nav>      
        </header>

        <main>
            <section className = "question-body">
                <div className = "question-body_content">
                    <div className = "question-list-container">
                        <ul className = "question-list">
                            <li className = "question-container"> 
                                <div className = "question">
                                    <div className="question__info"> 
                                        <div className="question__title">
                                            <h3 className="title__text">제목</h3>
                                        </div>
                                        <div className="question__body">

                                        </div>
                                        <div className="question__footer">
                                            <span>질문자</span>
                                            <span>&nbsp;&nbsp;시각</span>
                                            <div className="question__comment"> 댓글</div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

            </section>
        </main>
      </body>
    </div>
  );
}

export default QuestionListPage;
