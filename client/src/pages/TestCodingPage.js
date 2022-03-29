import React, { useState } from 'react';
import GoogleLoginBtn from '../components/GoogleLoginBtn';
import {call} from '../service/APIService';
import '../css/TestCodingPage.css';

function TestCodingPage() {
  const [userCode, setUserCode] = useState('');
  const [codeResult, setCodeResult] = useState('');
  
  const sendingCode = () =>{
    call("/api/v1/test", "POST", {code: userCode})
    .then(
      result =>{
        setCodeResult(result.data);
      }
    )
  }

  const login = () => {
    call("/oauth/base", "GET")
    .then(
      result =>{
        window.location.href =result;
      }
    )
  }

  const handleInput =(e) =>{
    setUserCode(e.target.value);
  }

  return (
    <div>
        <h1> 코드를 입력하세요 </h1>
        <input type = "text" onChange = {handleInput}/>
        <button onClick = {login}>로그인</button>
        <h1>코드 실행 결과</h1>
        <h3>
          {codeResult}
        </h3>
        {/* <GoogleLoginBtn></GoogleLoginBtn> */}
    </div>
  );
}

export default TestCodingPage;