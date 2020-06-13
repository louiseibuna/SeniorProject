
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
          bleh: ['so','what'],
        series: [{
          name: 'Open',
          data: []
        },{
          name: 'Closed',
          data: []
        },{
          name: 'Merged & Closed',
          data: []
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

    componentDidMount() {
      const owner = "scrapy";
      const repo = "scrapy";
      const apiUrl = 'https://api.github.com/repos/' + owner + '/' + repo + '/assignees?per_page=10';
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            this.setState(prevState => ({
            ...prevState,
            usersRendered: true,
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

        const users = ['dangra', 'elacuesta', 'eliasdorneles', 'Gallaecio', 'kmike', 'lopuhin', 'noviluni', 'pablohoffman', 'shaneaevans', 'wRAR'];

        {users.map(user => (
            this.grabAllPRs(user)
        ))}


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


    async grabAllPRs(user) {
            const query1 = "repo:scrapy/scrapy is:open reviewed-by:" + user;
            const query2 = "repo:scrapy/scrapy is:closed reviewed-by:" + user;
            const query3 = "repo:scrapy/scrapy is:merged reviewed-by:" + user;

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


            let result = await this.makeGraphQLQuery(query, variables);

            const openedPR = result.data.openedPR.issueCount;
            const closedPR = result.data.closedPR.issueCount - result.data.mergedPR.issueCount;
            const mergedAndClosedPR = result.data.mergedPR.issueCount;
            const totalPR = openedPR + closedPR + mergedAndClosedPR;

            this.setState(prevState => ({
            ...prevState,
                // bleh: [this.state.bleh.concat(user)],
                series: [{
                    ...prevState.series,
                    data: this.state.series[0].data.concat(openedPR),
                    },
                    {...prevState.series,
                    data: this.state.series[1].data.concat(closedPR),
                    },
                    {...prevState.series,
                    data: this.state.series[2].data.concat(mergedAndClosedPR),}]
            }));

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
