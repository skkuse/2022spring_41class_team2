import React, { useState } from 'react';
import {call} from '../service/APIService';

function UserInfoPage() {
  const [username, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  
  const getUserInfo = () =>{
      var token = sessionStorage.getItem("ACCESS_TOKEN");
      if(token == null){
        window.location.href = '/login';
      }
      call("/user", "POST", {'token' : token})
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

  return (
    <div>
        <h1> 이름 : {username}</h1>
        <h1> 이메일 : {userEmail}</h1>
    </div>
  );
}

export default UserInfoPage;