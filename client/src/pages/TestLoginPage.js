import React, { useState } from 'react';
import GoogleLoginBtn from '../components/GoogleLoginBtn';
import {call} from '../service/APIService';

function TestLoginPage() {
  return (
    <div>
        <h1> 로그인 하세요 </h1>
        <GoogleLoginBtn></GoogleLoginBtn>
      
    </div>
  );
}

export default TestLoginPage;