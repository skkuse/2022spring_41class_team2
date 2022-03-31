import { Route, HashRouter as Router, } from 'react-router-dom';
import Main from './pages/Main'
import TestLoginPage from './pages/TestLoginPage'
import UserInfoPage from './pages/UserInfo';

function App() {
  return (
    <Router>
        <Route exact path="/" component={Main} />
        <Route exact path="/login" component={TestLoginPage} />
        <Route exact path="/userInfo" component={UserInfoPage}/>
    </Router>
    
  );
}

export default App;
