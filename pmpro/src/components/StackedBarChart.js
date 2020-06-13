
import React, { Component } from "react";
import Chart from "react-apexcharts";
import { MDBContainer, MDBCard, MDBCardTitle } from "mdbreact";
import axios from "axios";

const API_KEY = process.env.REACT_APP_PMPRO_API_KEY;

require('dotenv').config()

class StackedBarChart extends Component {
    constructor(props) {
      super(props);

      this.state = {
        series: [{
          name: 'Open',
          data: [1121, 774, 506, 393, 250, 209, 182, 174, 173, 171]
        },{
          name: 'Closed',
          data: [13, 23, 20, 8, 13, 27]
        },{
          name: 'Merged & Closed',
          data: [11, 17, 15, 15, 21, 14]
        }],
        options: {
          chart: {
            type: 'bar',
            height: 350,
            stacked: true,
            toolbar: {
              show: true
            },
            zoom: {
              enabled: true
            }
          },
          responsive: [{
            breakpoint: 480,
            options: {
              legend: {
                position: 'bottom',
                offsetX: -10,
                offsetY: 0
              }
            }
          }],
          plotOptions: {
            bar: {
              horizontal: true,
            },
          },
          xaxis: {
            type: 'string',
            categories: [],
          },
          legend: {
            position: 'right',
            offsetY: 40,
            markers: {
                fillColors:["#98DE91", "#FDB45C", "#46BFBD"],

            }
          },
          fill: {
            colors:["#98DE91", "#FDB45C", "#46BFBD"],
            opacity: 1
          }
        },


      };

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


    async grabAllPRs() {
        const user = 1;
        const query1 = "repo:scrapy/scrapy is:pr is:open reviewed-by:" + user;
        const query2 = "repo:scrapy/scrapy is:pr is:closed reviewed-by:" + user;
        const query3 = "repo:scrapy/scrapy is:pr is:merged reviewed-by:" + user;

        const variables = {query1: query1, query2: query2, query3: query3};

        const query = `
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

        try {
            let result = await this.makeGraphQLQuery(query, variables);

            const openedPR = result.data.repository.openedPR.totalCount;
            const closedPR = result.data.repository.closedPR.totalCount;
            const mergedAndClosedPR = result.data.repository.mergedPR.totalCount;
            const totalPR = openedPR + closedPR + mergedAndClosedPR;

            this.setState(prevState =>
                ({ totalPR: totalPR,
                    dataPie: {
                        ...prevState.dataPie,
                            datasets: [{
                                data: [openedPR, closedPR, mergedAndClosedPR] }]}}));
        } catch (exception) { console.error(exception); }
    }

    componentDidMount() {
      const owner = "scrapy";
      const repo = "scrapy";
      const apiUrl = 'https://api.github.com/repos/' + owner + '/' + repo + '/contributors?per_page=10';
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            this.setState(prevState => ({
            ...prevState,
            options: {
                ...prevState.options,
                xaxis: {
                    ...prevState.options.xaxis,
                    categories: [data[0].login,
                           data[1].login,
                           data[2].login,
                           data[3].login,
                           data[4].login,
                           data[5].login,
                           data[6].login,
                           data[7].login,
                           data[8].login,
                           data[9].login]
                    }
                }
            }))
            console.log(this.state.data)
        })
        .catch(console.log)

        const users = this.state.options.xaxis.categories;
        for (const user of users.entries()) {
            this.grabAllPRs();
        }

    }


  render() {
    return (
        <MDBContainer>
            <MDBCard className="card-body" style={{ width: "35rem", marginTop: "1rem" }}>
              <MDBCardTitle>PR Contributors</MDBCardTitle>
              <div className="app">
                <div className="row">
                  <div className="mixed-chart">
                    <Chart
                      options={this.state.options}
                      series={this.state.series}
                      type="bar"
                      width="500"
                    />
                  </div>
                </div>
              </div>
            </MDBCard>
        </MDBContainer>
    );
  }
}

export default StackedBarChart;
