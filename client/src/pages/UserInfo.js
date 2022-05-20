import React, { useState } from 'react';
import {call} from '../service/APIService';
import { Link } from "react-router-dom";
import '../css/UserInfo.css'
import my_lectures from "../image/json1.json";

function UserInfoPage() {
  const [username, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  
  /*const getUserInfo = () =>{
      var token = sessionStorage.getItem("ACCESS_TOKEN");
      if(token == null){
        window.location.href = '/login';
      }
      call("/user", "GET")
      .then(
        response => {
            setUserName(response['data']['name'])
            setUserEmail(response['data']['email'])
        }
      )
      .catch(
        error => {
          window.location.href = '/login'  
        }
        
      )
  }

  getUserInfo()

*/

  return (
	  <div class="background">
		  <div class="warp">
			  <div id="upper">
				  <div class="v12_15">
					  <span class="v5_31">CrawlLearn</span>
					  <div class="v5_30">
						  <div class="v5_32">도움말</div>
						  <div class="v5_32">ABOUT US</div>
					  </div>
				  </div>

			  </div>
			  <div class="profile">
				  <div class="account">
					  <div class="title_info">
						  <span>기본정보</span>
						  <button class="button_greenM" type="button">변경하기</button>
					  </div>
					  <div class="my_name">
						  <span>이름</span><br/>
						  <input id="my_name_change"></input>
					  </div>
						  <div class="my_email">
							  <span>이메일</span><br/>
								  <div id="email_addr">xxx@g.skku.edu</div>
						  </div>
						  </div>
						  <div class="activity">
							  <div class="title_info">
								  <span>활동정보</span>
							  </div>
							  <div id="my_registered">
								  <select>
									  <option value="">Registered</option>
									  {my_lectures.map((lectureE) => <option value={lectureE.lecture_content_seq} >{lectureE.lecture_name}</option>)}
								  </select>
							  </div>
							  <div id="my_qa">
								  <select>
									  <option value="">QA</option>
									  {my_lectures.map((lectureE) => <option value={lectureE.lecture_content_seq} >{lectureE.lecture_name}</option>)}	
								  </select>
							  </div>
							  <div id="my_liked">
							      <select>
										<option value="">Like</option>
										{my_lectures.map((lectureE) => <option value={lectureE.lecture_content_seq} >{lectureE.lecture_name}</option>)}
								  </select>
							  </div>
						  </div>
					  </div>
				  </div>

			  </div>
  );
}

export default UserInfoPage;