import React from "react";
import { Pie } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;

require('dotenv').config()

class PieChart extends React.Component {
    constructor(){
        super();
        this.state = {
            totalPR: '',
            openedPR: '',
            mergedPR: '',
            closedPR: '',
            totalIssues: '',
            dataPie: {
                labels: ["Open PRs", "Closed PRs", "Closed & Merged PRs"],
                datasets: [
                    {
                    data: [],
                    backgroundColor: [
                        "#98DE91",
                        "#FDB45C",
                        "#46BFBD",
                        "#949FB1",
                        "#4D5360",
                        "#AC64AD"
                    ],
                    hoverBackgroundColor: [
                        "#c1ebbd",
                        "#FFC870",
                        "#5AD3D1",
                        "#A8B3C5",
                        "#616774",
                        "#DA92DB"
                    ]
                }
              ]
            }
        }
    }

  makeGraphQLQuery(query) {
      return axios({
          "method": "POST",
          "headers": {
              "Authorization": 'Bearer ' + API_KEY
          },
          "url": "https://api.github.com/graphql",
          "data": {
              "query": query
          }
      }).then(response => response.data);
  }

  async componentDidMount() {
      try {
          let result = await this.makeGraphQLQuery(`
           {
                repository(owner:"scrapy", name:"scrapy") {
                    totalPR: pullRequests(first: 100, states: OPEN) {
                        totalCount
                    }
                    openedPR: pullRequests(first: 100, states: OPEN) {
                        totalCount
                    }
                    mergedPR: pullRequests(first: 100, states: MERGED) {
                        totalCount
                    }
                    closedPR: pullRequests(first: 100, states: CLOSED) {
                        totalCount
                    }
                    totalIssues: issues {
                        totalCount
                    }
                }
            }`
    );


    this.setState(prevState => ({
                    totalPR: result.data.repository.totalPR.totalCount,
                    openedPR: result.data.repository.openedPR.totalCount,
                    mergedPR: result.data.repository.mergedPR.totalCount,
                    closedPR: result.data.repository.closedPR.totalCount,
                    totalIssues: result.data.repository.totalIssues.totalCount,
                    dataPie: {
                        ...prevState.dataPie,
                        datasets:
                            [{
                            data: [result.data.repository.openedPR.totalCount,
                                result.data.repository.closedPR.totalCount,
                                result.data.repository.closedPR.totalCount + result.data.repository.mergedPR.totalCount]

                        }]}}));
      } catch (exception) {
          console.error(exception);
      }
  }

  render() {
    return (
      <MDBContainer>
        
        <Pie data={this.state.dataPie} options={{ responsive: true }} />
        <p>Total PRs: {this.state.openedPR + this.state.closedPR + this.state.mergedPR}</p>
      </MDBContainer>
    );
  }
}

export default PieChart;

// data: [300, 50, 100, 40, 120],
