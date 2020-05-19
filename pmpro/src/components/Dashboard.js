import React from 'react';
import '../styles/Dashboard.css';
import 'bootstrap-4-grid/css/grid.min.css';
import PieChart from './PieChart';
import InputPage from './InputPage';
import DoughnutChart from './DoughnutChart';


export const Dashboard = () => (
    <div className="bootstrap-wrapper">
    <div className="app-container container">
      <div className="row">
        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
          <h1>Metrics Dashboard</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
            <h3>Pull Request Graph</h3>
            <PieChart />
        </div>
        <div className="col-md-6">
            <h3>PR Stats [FILLER]</h3>
            <DoughnutChart />
        </div>
     </div>
     <InputPage />
      <h4 style={{ display: 'none' }}>Dialog Shown/Hidden with Logic</h4>
    </div>
  </div>

)
