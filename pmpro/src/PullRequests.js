// import React from 'react';
// import { Query } from 'react-apollo';
// import gql from 'apollo-boost';
// import styled from 'styled-components';
// import 'styled-components/macro';



// const PullRequests = () => (
//     <Query query={gql`
//         {
//           repository(owner:"octocat", name:"Hello-World") {
//             issues(last:20, states:CLOSED) {
//               edges {
//                 node {
//                   id
//                   title
//                   url
//                 }
//               }
//             }
//           }
//         }
//
//     `}>
//         {({loading, error, data}) => {
//             if (loading) return <p>Loading...</p>;
//             if (error) return <p>Error :(</p>;
//
//             // map iterates through list of courses
//             return data.repository.map(({id,title,url,}) => (
//                 <div key={id}>
//                     <p>{`url: ${url}`}</p>
//                 </div>
//             ));
//         }}
//     </Query>
// );
//
// export default PullRequests;
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
