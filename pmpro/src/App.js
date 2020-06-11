import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { NavBar } from './components/NavBar';
import { Layout } from './components/Layout';
import Dashboard from './components/Dashboard';
import SideBar from "./components/SideBar2";
import './App.css';

class App extends React.Component {

    render () {
      return (
        <React.Fragment>
        <div id="App">
          <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"} />
        </div>
          <Router>
          <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"} />
            <NavBar>
              <Layout>
                <Switch>
                  <Route exact path="/" component={Dashboard} />
                </Switch>
              </Layout>
            </NavBar>
          </Router>

        </React.Fragment>
      );
    }
}

export default App;
