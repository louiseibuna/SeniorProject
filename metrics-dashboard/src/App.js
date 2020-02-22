import React from 'react';
import './App.css';
// import Button from '@material-ui/core/Button';
import SignUpPage from './components/SignUpPage.js';
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";


function App() {
 return (
   <HashRouter>
     <div>
        <ul>
          <h1>PMPro</h1>
          <li><NavLink to="/">SignUpPage</NavLink></li>
      </ul>
        <div className="content">
        <Route path="/"component={SignUpPage}/>
        </div>
     </div>
   </HashRouter>
 )
}

export default App;
