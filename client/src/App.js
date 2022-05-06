import { BrowserRouter, Route, Switch } from "react-router-dom";
import Main from './pages/Main'
import SignInPage from './pages/SignInPage'
import UserInfoPage from './pages/UserInfo';
import TestCodePage from './pages/TestCodePage';
import LoginPage from './pages/LoginPage';
import QuestionPage from './pages/QuestionPage';
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
        <Route exact path="/codeEdit" component={TestCodePage}/> 
        <Route exact path="/questionPage" component={QuestionPage}/>
        <Route exact path="/questionView" component={QuestionViewPage}/>
        <Route exact path="/qna" component={QuestionListPage}/>
        <Route exact path="/" component={Main}/>
      </Switch>
    </BrowserRouter>

  );
}

export default App;
