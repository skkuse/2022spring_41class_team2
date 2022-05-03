import { Route, HashRouter as Router, } from 'react-router-dom';
import Main from './pages/Main'
import SignInPage from './pages/SignInPage'
import UserInfoPage from './pages/UserInfo';
import TestCodePage from './pages/TestCodePage';
import LoginPage from './pages/LoginPage';
//수정
import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

function App() {


  return (
    <Router>
      <Route exact path="/" component={TestCodePage} />
      {/* <Route exact path="/signIn" component={SignInPage} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/userInfo" component={UserInfoPage} />
      <Route exact path="/codeEdit" component={TestCodePage} /> */}
    </Router>


  );
}

export default App;
