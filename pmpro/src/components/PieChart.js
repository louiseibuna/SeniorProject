import React, { Fragment } from "react";
import { Pie } from "react-chartjs-2";
import { MDBContainer, MDBBtn, MDBCard, MDBCardTitle } from "mdbreact";
import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;

require('dotenv').config()


class PieChart extends React.Component {
    constructor(props){
        super(props);
        var last_7_days_date = new Date();
        last_7_days_date.setDate(last_7_days_date.getDate() - 7);
        var day1 = ("0" + (last_7_days_date.getDate())).slice(-2);
        var month1 = ("0" + (last_7_days_date.getMonth() + 1)).slice(-2);
        var year1 = last_7_days_date.getFullYear();
        var date7 = year1 + '-' + month1 + '-' + day1;

        var last_30_days_date = new Date();
        last_30_days_date.setDate(last_30_days_date.getDate() - 30);
        var day2 = ("0" + (last_30_days_date.getDate())).slice(-2);
        var month2 = ("0" + (last_30_days_date.getMonth() + 1)).slice(-2);
        var year2 = last_30_days_date.getFullYear();
        var date30 = year2 + '-' + month2 + '-' + day2;

        this.state = {
            last_7_days_date: date7,
            last_30_days_date: date30,
            totalPR: '',
            owner: "npm",
            repo: "cli",
            value: '',
            dataPie: {
            labels: ["Open PRs", "Closed PRs", "Closed & Merged PRs"],
            datasets: [{
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
            ]}
        }

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
        const owner = this.props.owner;
        const name = this.props.repo;
        const variables = {owner: owner, name: name};

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
            let result = await this.makeGraphQLQuery(allPRQuery, variables);

            const openedPR = result.data.repository.openedPR.totalCount;
            const closedPR = result.data.repository.closedPR.totalCount;
            const mergedAndClosedPR = result.data.repository.mergedPR.totalCount;
            const totalPR = openedPR + closedPR + mergedAndClosedPR;
            const owner = this.props.owner;
            const repo = this.props.repo;

            this.setState(prevState =>
                ({  owner: owner,
                    repo: repo,
                    totalPR: totalPR,
                    dataPie: {
                        ...prevState.dataPie,
                            datasets: [{
                                data: [openedPR, closedPR, mergedAndClosedPR] }]}}));
        } catch (exception) { console.error(exception); }
    }

    async grabWeekPRs() {
        const owner = this.props.owner;
        const name = this.props.repo;
        const weekDate = this.state.last_7_days_date;
        const query1 = "repo:" + owner + "/" + name + " is:pr is:open updated:>" + weekDate;
        const query2 = "repo:" + owner + "/" + name + " is:pr is:closed updated:>" + weekDate;
        const query3 = "repo:" + owner + "/" + name + " is:pr is:merged updated:>" + weekDate;

        const variables = {query1: query1, query2: query2, query3: query3};

        const weekQuery = `
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
            let result = await this.makeGraphQLQuery(weekQuery, variables);

            const openedPR = result.data.openedPR.issueCount;
            const closedPR = result.data.closedPR.issueCount - result.data.mergedPR.issueCount;
            const mergedAndClosedPR = result.data.mergedPR.issueCount;
            const totalPR = openedPR + closedPR + mergedAndClosedPR;
            const owner = this.props.owner;
            const repo = this.props.repo;

            this.setState(prevState =>
                ({  owner: owner,
                    repo: repo,
                    totalPR: totalPR,
                    dataPie: {
                        ...prevState.dataPie,
                            datasets: [{
                                data: [openedPR, closedPR, mergedAndClosedPR] }]}}));
        } catch (exception) { console.error(exception); }
    }

    async grabMonthPRs() {
        const owner = this.props.owner;
        const name = this.props.repo;
        const monthDate = this.state.last_30_days_date;
        const query1 = "repo:" + owner + "/" + name + " is:pr is:open updated:>" + monthDate;
        const query2 = "repo:" + owner + "/" + name + " is:pr is:closed updated:>" + monthDate;
        const query3 = "repo:" + owner + "/" + name + " is:pr is:merged updated:>" + monthDate;
        const variables = {query1: query1, query2: query2, query3: query3};

        const monthQuery = `
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
            let result = await this.makeGraphQLQuery(monthQuery, variables);

            const openedPR = result.data.openedPR.issueCount;
            const closedPR = result.data.closedPR.issueCount - result.data.mergedPR.issueCount;
            const mergedAndClosedPR = result.data.mergedPR.issueCount;
            const totalPR = openedPR + closedPR + mergedAndClosedPR;
            const owner = this.props.owner;
            const repo = this.props.repo;

            this.setState(prevState =>
                ({  owner: owner,
                    repo: repo,
                    totalPR: totalPR,
                    dataPie: {
                        ...prevState.dataPie,
                            datasets: [{
                                data: [openedPR, closedPR, mergedAndClosedPR] }]}}));
        } catch (exception) { console.error(exception);}
    }

    componentDidMount() {
        this.grabAllPRs();
    }

    render() {
        return (
            <div>

            <Fragment>
            <MDBContainer>
                <MDBCard className="card-body" style={{ width: "35rem", marginTop: "1rem" }}>
                  <MDBCardTitle>Pull Request Graph</MDBCardTitle>
                  <Pie data={ this.state.dataPie } options={{ responsive: true }} /> &nbsp;
                  <div className="flex-row">
                  <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                  <MDBBtn color="info" onClick={ () => this.grabAllPRs() }>All Time</MDBBtn> &nbsp;
                  <MDBBtn color="info" onClick={ () => this.grabMonthPRs() }>Last 30 Days</MDBBtn> &nbsp;
                  <MDBBtn color="info" onClick={ () => this.grabWeekPRs() }>Last 7 Days</MDBBtn>
                  </div>
                  &nbsp;
                  <p> <b>Total PRs:</b> { this.state.totalPR }</p>
                  <button onClick={() => this.grabAllPRs() }> Update </button>
                  </div>
                </MDBCard>
            </MDBContainer>
            </Fragment>
            </div>
        );
    }
}

export default PieChart;
