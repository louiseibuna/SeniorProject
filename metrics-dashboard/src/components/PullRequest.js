import React, { Component } from 'react';


class PullRequest extends Component {

    state = {
        error: null,
        isLoaded: false,
        items: []
    }

    render() {
        return <div></div>;
    }
}
export default PullRequest;



// https://api.github.com/graphql
// Bearer 7eb60bcbdcef6403564b91992650213d1ebfb850
//
// query {
//   repository(owner:"scrapy", name:"scrapy") {
//     pullRequests(first: 100, states: [OPEN, CLOSED, MERGED]) {
//       totalCount
//       nodes {
//         createdAt
//         number
//         title
//         state
//       }
//       pageInfo {
//         hasNextPage
//         endCursor
//       }
//     }
//   }
// }
