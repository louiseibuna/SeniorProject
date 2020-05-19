import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { NavBar } from './components/NavBar';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import './App.css';
import { SideBar } from './components/SideBar.js';

function App() {
  return (
    <React.Fragment>
      <SideBar>
      <Router>
        <NavBar>
          <Layout>
            <Switch>
              <Route exact path="/" component={Dashboard} />
            </Switch>
          </Layout>
        </NavBar>
      </Router>
      </SideBar>
    </React.Fragment>
  );
}

export default App;
