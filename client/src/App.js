import { Route, HashRouter as Router, } from 'react-router-dom';
import Main from './pages/Main'
import TestLoginPage from './pages/TestLoginPage'
import UserInfoPage from './pages/UserInfo';
import TestCodePage from './pages/TestCodePage';

function App() {
  return (
    <Router>
        <Route exact path="/" component={Main} />
        <Route exact path="/login" component={TestLoginPage} />
        <Route exact path="/userInfo" component={UserInfoPage}/>
        <Route exact path="/codeEdit" component={TestCodePage}/>
    </Router>
    
  );
}

export default App;
