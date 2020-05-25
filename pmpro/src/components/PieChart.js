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
      /* these consts are for the timeRangeQuery */
      /* TODO: Still need to be able to pass the date */
      const query1 = "repo:scrapy/scrapy is:pr is:open updated:>" + "2020-03-29 ";
      const query2 = "repo:scrapy/scrapy is:pr is:closed updated:>" + "2020-03-29 ";
      const query3 = "repo:scrapy/scrapy is:pr is:merged updated:>" + "2020-03-29 ";
      const variables = {query1: query1, query2: query2, query3: query3};

      const timeRangeQUery = `
        query ($query1: String!, $query2: String!, $query3: String!) {
            openedPR: search(query: $query1, type: ISSUE, last: 100) {
                issueCount
            }
            closedPR: search(query: $query2, type: ISSUE, last: 100) {
                issueCount
            }
            mergedPR: search(query: $query3, type: ISSUE, last: 100) {
                issueCount
            }
        }`;

      /* consts for allPRQuery */
      const allPRVar = {owner: "scrapy", name: "scrapy"};

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

      try {
          let result = await this.makeGraphQLQuery(timeRangeQUery, variables);

          // const openedPR = result.data.repository.openedPR.totalCount;
          // const closedPR = result.data.repository.closedPR.totalCount;
          // const mergedAndClosedPR = result.data.repository.closedPR.totalCount + result.data.repository.mergedPR.totalCount;
          // const totalPR = openedPR + mergedAndClosedPR;

          const openedPR = result.data.openedPR.issueCount;
          const closedPR = result.data.closedPR.issueCount - result.data.mergedPR.issueCount;
          const mergedAndClosedPR = result.data.mergedPR.issueCount;

          const totalPR = openedPR + closedPR + mergedAndClosedPR;



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
