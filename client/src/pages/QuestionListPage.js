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
            setPosts(response['data'][0])
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
                <div id="upper" className="v12_13 v12_13_1">
                    <div className="v12_12">
                        <div className="v5_26">
                            <span>ABOUT US</span>
                        </div>
                    </div>
                </div>

                <header className="mp_h_1">
                    <div className="mp_c_1">
                        <span className="v5_33">CrawlLearn</span><br />
                        <span className="v5_26_3">파이썬 기초부터 크롤링 심화까지! 모든 강의와 실습을 한번에 즐겨보세요.</span>
                    </div>
                </header>


                <main>
                    <div className="navbar">
                        <div className="navbar-menu">
                            <div>
                                <Link to="/">
                                    <button className="button" type="button">Lecture</button>
                                </Link>
                            </div>
                            <div>
                                <button className="button" type="button">QA</button>
                            </div>
                        </div>
                    </div>
                    <div className="question-body_content">
                        <Link to="/">
                            <button className="write-button">작성하기</button>
                        </Link>

                        <div className="question-list-container">
                            <ul className="question-list">
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

