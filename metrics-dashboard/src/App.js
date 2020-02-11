import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import LoginPage from './components/LoginPage.js';
import NavBar from './components/NavBar.js';

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Route name="login" exact path="/" component={LoginPage} />
      </div>
    </Router>
  );
}

export default App;
