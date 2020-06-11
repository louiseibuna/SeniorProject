import React from 'react';
import '../styles/Dashboard.css';
import 'bootstrap-4-grid/css/grid.min.css';
import PieChart from './PieChart';
import StackedBarChart from "./StackedBarChart";

class Dashboard extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          value: '',
          owner: "npm",
          repo: "cli",
      };
    }

    render() {
      return (
          <div className="bootstrap-wrapper">
          <div className="app-container container">

            <div className="row">
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <h1>Metrics Dashboard</h1>
                Owner &nbsp;
                <input onChange={e1 => this.setState({owner: e1.target.value })} /> &nbsp;
                Repo &nbsp;
                <input onChange={e => this.setState({repo: e.target.value })} /> &nbsp;

              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                  <PieChart owner={this.state.owner} repo={this.state.repo}/>
              </div>
              <div className="col-md-6">
                  <StackedBarChart />
              </div>
           </div>

            <h4 style={{ display: 'none' }}>Dialog Shown/Hidden with Logic</h4>
          </div>
        </div>
      );
    }
 }

export default Dashboard;
