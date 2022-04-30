import React from 'react';
import '../css/QuestionListPage.css';

function QuestionListPage() {


  return (
    <div className="App">
      <body>
        <header>
          <section class = "question-header">
                  <div class = "question-header_content">
                      <h2 class= "question-header_title">CrawlLearn</h2>
                      <p class = "question-header_sub-title">파이썬 기초부터 크롤링 심화까지! 모든 강의와 실습을 한번에 즐겨보세요.</p>
                  </div>
          </section>
            <nav class="navbar">
              <div class="navbar-menu">
                <div class="navbar-container">
                    <a class="navbar-item" href="#home">강의</a>
                    <a class="navbar-item" href="#news">Q&A</a>
                  <div class="navbar-right">
                    <a class="write-button" href="#search" data-role="button" data-inline="true" >작성하기</a>
                  </div>
                </div>
              </div>
            </nav>      
        </header>

        <main>
            <section class = "question-body">
                <div class = "question-body_content">
                    <div class = "question-list-container">
                        <ul class = "question-list">
                            <li class = "question-container"> 
                                <div class = "question">
                                    <div class="question__info"> 
                                        <div class="question__title">
                                            <h3 class="title__text">제목</h3>
                                        </div>
                                        <div class="question__body">

                                        </div>
                                        <div class="question__footer">
                                            <span>질문자</span>
                                            <span>&nbsp;&nbsp;시각</span>
                                            <div class="question__comment"> 댓글</div>
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
