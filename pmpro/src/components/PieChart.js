import React from "react";
import { Pie } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;

require('dotenv').config()


class PieChart extends React.Component {

    constructor(props){
        super(props);
        var date = new Date();
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        var curDate = year + '-' + month + '-' + day;

        this.sayHello = this.sayHello.bind(this);
        this.state = {
                curDate: curDate,
                totalPR: '',
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

  sayHello() {
    alert('Hello!');
  }

  makeGraphQLQuery(query, variables) {
      return axios({
          "method": "POST",
          "headers": {
              "Authorization": 'Bearer ' + API_KEY
          },
          "url": "https://api.github.com/graphql",
          "data": {
              "query": query,
              "variables": variables
          }
      }).then(response => response.data);
  }

  async componentDidMount() {
      const variables = {owner: "scrapy", name: "scrapy"};
      const githubQuery = {query: "repo:scrapy/scrapy is:pr is:closed updated:>" + "2020-05-14"};

      const allPRQuery = `
       query ($owner: String!, $name: String!) {
            repository(owner: $owner, name: $name) {
                openedPR: pullRequests(first: 100, states: OPEN) {
                    totalCount
                }
                mergedPR: pullRequests(first: 100, states: MERGED) {
                    totalCount
                }
                closedPR: pullRequests(first: 100, states: CLOSED) {
                    totalCount
                }
            }
        }`;

      const withinLastMonth = `
      {
          search(query: $query, type: ISSUE, last: 100) {
            issueCount
            edges {
              node {
                ... on PullRequest {
                  title
                }
              }
            }
          }
        }`;

      try {
          let result = await this.makeGraphQLQuery(allPRQuery, variables);

          const openedPR = result.data.repository.openedPR.totalCount;
          const closedPR = result.data.repository.closedPR.totalCount;
          const mergedAndClosedPR = result.data.repository.closedPR.totalCount + result.data.repository.mergedPR.totalCount;
          const totalPR = openedPR + mergedAndClosedPR;

          this.setState(prevState => ({
                        totalPR: totalPR,
                        dataPie: {
                        ...prevState.dataPie,
                            datasets: [{
                                data: [openedPR, closedPR, mergedAndClosedPR]
                            }]}}));
      } catch (exception) {
          console.error(exception);
      }
  }

  render() {
    return (

      <MDBContainer>
      <button onClick={this.sayHello}>
      Last 7 Days
      </button>

        <Pie data={this.state.dataPie} options={{ responsive: true }} />
        <p>Total PRs: {this.state.totalPR}</p>
        <p>Current Date: {this.state.curDate}</p>
      </MDBContainer>
    );
  }
}

export default PieChart;

// data: [300, 50, 100, 40, 120],
