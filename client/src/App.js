import { Route, HashRouter as Router, } from 'react-router-dom';
import Main from './pages/Main'
import TestCodingPage from './pages/TestCodingPage'

function App() {
  return (
    <Router>
        <Route exact path="/" component={Main} />
        <Route exact path="/testpage" component={TestCodingPage} />
    </Router>
    
  );
}

export default App;
