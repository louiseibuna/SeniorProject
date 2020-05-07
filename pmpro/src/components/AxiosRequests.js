import React from "react";
import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;

require('dotenv').config()

class AxiosRequests extends React.Component {

    constructor() {
        super();
        this.state = {
            totalPR: '',
            openedPR: '',
            mergedPR: '',
            closedPR: '',
            totalIssues: '',

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
            this.setState({ totalPR: result.data.repository.totalPR.totalCount,
                            openedPR: result.data.repository.openedPR.totalCount,
                            mergedPR: result.data.repository.mergedPR.totalCount,
                            closedPR: result.data.repository.closedPR.totalCount,
                            totalIssues: result.data.repository.totalIssues.totalCount});
        } catch (exception) {
            console.error(exception);
        }
    }

    render() {
        return (
            <div>
                <p>totalPR: {this.state.totalPR}</p>
                <p>openedPR: {this.state.openedPR}</p>
                <p>mergedPR: {this.state.mergedPR}</p>
                <p>closedPR: {this.state.closedPR}</p>
                <p>totalIssues: {this.state.totalIssues}</p>

            </div>
        );
    }

}

export default AxiosRequests;
