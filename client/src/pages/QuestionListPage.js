import React, { useState, useEffect } from 'react';
import '../css/QuestionListPage.css';
import { Link } from "react-router-dom";
import axios from 'axios';
import Posts from './Post'
import Pagination from './Pagination';
import { call } from '../service/APIService';

function QuestionListPage() {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);


  useEffect( () => { //no params, 익명 함수 
    async function fetchData() {
      setLoading(true);

      //const response = await axios.get('https://jsonplaceholder.typicode.com/posts');

      // setPosts(response.data);
      // setLoading(false);


      call("/qna", "GET")
      .then(
        response => {
            setPosts(response[''])
        }
      )

      setLoading(false);
    
    }
    fetchData();
  },[]);

  /* page 별로 postsPerPage 만큼 보여주는 것*/
  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  function currentPosts(tmp) {
    let currentPosts = 0;
    currentPosts = tmp.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  }

  

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
          
                    <div className = "question-list-container">
                        <ul className = "question-list">
                          <Link to="/questionView">
                          <Posts posts={currentPosts(posts)} loading={loading}></Posts>
                          </Link>
              
                        </ul>
                        <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={setCurrentPage}></Pagination>
                    </div>
                </div>
        </main>
      </body>
    </div>
  );
}

export default QuestionListPage;

{/* <Link to="/questionView">
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
                         */}