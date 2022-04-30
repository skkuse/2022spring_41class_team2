import { Route, HashRouter as Router, } from 'react-router-dom';
import Main from './pages/Main'
import SignInPage from './pages/SignInPage'
import UserInfoPage from './pages/UserInfo';
import TestCodePage from './pages/TestCodePage';
import LoginPage from './pages/LoginPage';
import QuestionPage from './pages/QuestionPage';
import QuestionListPage from './pages/QuestionListPage';

function App() {
  return (
    <Router>
        <Route exact path="/main" component={Main} />
        <Route exact path="/signIn" component={SignInPage} />
        <Route exact path="/login" component={LoginPage}/>
        <Route exact path="/userInfo" component={UserInfoPage}/>
        <Route exact path="/codeEdit" component={TestCodePage}/> 
        <Route exact path="/" component={QuestionPage}/>
        <Route exact path="/questionList" component={QuestionListPage}/>
    </Router>
    
  );
}

export default App;
