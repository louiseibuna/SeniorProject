import React from "react";
import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;

class AxiosRequests extends React.Component {

    constructor() {
        super();
        this.state = {
            pullRequests: [],
            totalCount: ''
        }
    }

    makeGraphQLQuery(query) {
        return axios({
            "method": "POST",
            "headers": { "Authorization": 'Bearer ' + API_KEY},
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
                pullRequests(first: 100, states: [OPEN, CLOSED, MERGED]) {
                  totalCount
                  nodes {
                    createdAt
                    number
                    title
                    state
                  }
                  pageInfo {
                    hasNextPage
                    endCursor
                  }
                }
              }
          }`
      );
            this.setState({ pullRequests: result.data.repository.pullRequests.nodes,
                            totalCount: result.data.repository.pullRequests.totalCount });
        } catch (exception) {
            console.error(exception);
        }
    }

    render() {
        return (
            <div>
                {this.state.totalCount}
                {
                    this.state.pullRequests.map((pullRequest, key) => {
                        return <p key={key}> {pullRequest.title} has STATE: {pullRequest.state}</p>
                    })
                }

            </div>
        );
    }

}

export default AxiosRequests;
