import React, { useState, useEffect, useLocation } from 'react';
import '../css/QuestionListPage.css';
import { Link } from "react-router-dom";
import Posts from './Post'
import Pagination from './Pagination';
import { call } from '../service/APIService';
import QaPageNav from '../components/QaPageNav';

function QuestionListPage({location}) {

  const data = location.state;

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);

  const [isLecture, setIsLecture] = useState(false);
  
  const [lecture_content_title, setLecture_content_title] = useState(data.lecture_content_title);

  const getUserInfo = () => {
		var token = sessionStorage.getItem("ACCESS_TOKEN");
		return token;
	};


  useEffect( () => { //no params, 익명 함수 
    function fetchData() {
      setLoading(true);

      setIsLecture(data.isLecture);

      if( data.lecture_content_seq ){
        call("/lectures/lectureContents/"+ data.lecture_content_seq + "/qa", "GET")
        .then(
          response => {
              setPosts(response['data'][0])
              console.log(lecture_content_title,"질문");
              
          }
        )
      }
      else{

          call("/qna", "GET")
          .then(
            response => {
                setPosts(response['data'][0])
                console.log(lecture_content_title,"질문");
                
            }
          )
        
      }

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
      <body className="question-list-page">
        
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

          <div className="mp_c_1">
              <QaPageNav sessionV={getUserInfo()}></QaPageNav>
					</div>
          
                <div className = "question-list-body">
                
                    <div className = "question-list-container">
                        <ul className = "question-list">
                          <Posts posts={currentPosts(posts)} loading={loading}></Posts>
                         
              
                        </ul>
                        <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={setCurrentPage}></Pagination>
                    </div>
                </div>
      
      </body>
    </div>
  );
}

export default QuestionListPage;

