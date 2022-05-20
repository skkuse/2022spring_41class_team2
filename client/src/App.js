//import { Route, HashRouter, BrowserRouter as Router, BrowserRouter, } from 'react-router-dom';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Main from './pages/Main'
import SignInPage from './pages/SignInPage'
import UserInfoPage from './pages/UserInfo';
import TestCodePage from './pages/TestCodePage';
import LoginPage from './pages/LoginPage';
import QuestionWritePage from './pages/QuestionWritePage';
import QuestionViewPage from './pages/QuestionViewPage';
import QuestionListPage from './pages/QuestionListPage';



function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/main" component={Main} />
        <Route exact path="/signIn" component={SignInPage} />
        <Route exact path="/login" component={LoginPage}/>
        <Route exact path="/userInfo" component={UserInfoPage}/>
        <Route exact path="/testCodePage" component={TestCodePage}/> 
        <Route exact path="/qaWrite" component={QuestionWritePage}/>
        <Route exact path="/qaView" component={QuestionViewPage}/>
        <Route exact path="/qaList" component={QuestionListPage}/>
      </Switch>
    </BrowserRouter>

  );
}

export default App;


//{<Router>
    //     <Route exact path="/main" component={Main} />
    //     <Route exact path="/signIn" component={SignInPage} />
    //     <Route exact path="/login" component={LoginPage}/>
    //     <Route exact path="/userInfo" component={UserInfoPage}/>
    //     <Route exact path="/codeEdit" component={TestCodePage}/> 
    //     <Route exact path="/" component={QuestionPage}/>
    //     <Route exact path="/questionList" component={QuestionListPage}/>
    // </Router> 