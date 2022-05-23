import React, { useState, useEffect } from 'react';
import {call} from '../service/APIService';
import '../css/UserInfo.css'

function UserInfoPage() {
  const [username, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userChangeName, setUserChangeName] = useState('');
  const [userAttendingLecture, setuserAttendingLecture] = useState([]);
  const [userLikeLecture, setuserLikeLecture] = useState([]);
  const [userQA, setuserQA] = useState([]);
  
  const getUserInfo = () =>{
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

	  call("/user/info", "GET")
	  .then(
		  response => {
				setuserAttendingLecture(response['data']['attending_lecture'])
				setuserLikeLecture(response['data']['like_lecture_info'])
				setuserQA(response['data']['qa_info'])
		  }
	  ).catch(
		  error => {
			  window.location.href = '/login'
		  }
	  )
	}

	const chageUserName = () =>{
		call("/user/name", 'PATCH', {'name' : userChangeName.toString()})
		.then(
			response =>{
				console.log(response)
				setUserName(userChangeName)
			}
		).catch(
			error =>{

			}
		)
	}

	useEffect(() => {
		getUserInfo();
	  },[]);

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
							<button class="button_greenM" type="button" onClick = {chageUserName}>변경하기</button>
						</div>
						<div class="my_name">
							<span>이름 : {username}</span><br/>
							<input id="my_name_change" placeholder= {username} onChange={(event) => setUserChangeName(event.target.value)}></input>
						</div>
							<div class="my_email">
								<span>이메일 : {userEmail}</span><br/>
							</div>
							</div>
							<div class="activity">
								<div class="title_info">
									<span>활동정보</span>
								</div>
								<div id="my_registered">
									<select>
										<option value="">Registered</option>
										{userAttendingLecture.map((item) => (
											<option value={item} key={item}>
											{item}
											</option>
										))}
										
									</select>
								</div>
								<div id="my_qa">
									<select>
										<option value="">QA</option>
										{userQA.map((item) => (
											<option value={item} key={item}>
											{item}
											</option>
										))}
									</select>
								</div>
								<div id="my_liked">
									<select>
										<option value="">Like</option>
										{userLikeLecture.map((item) => (
											<option value={item} key={item}>
											{item}
											</option>
										))}
									</select>
								</div>
							</div>
						</div>
					</div>

				</div>
	);
}

export default UserInfoPage;