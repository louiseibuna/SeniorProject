// import React from 'react';
// import './App.css';
// import Dashboard from './components/Dashboard/Dashboard.js';
// import PullRequest from './components/PullRequest.js'
//
// function App() {
//
//  return (
//    <div>
//    <Dashboard />
//    <PullRequest />
//    </div>
//  )
// }
//
// export default App;
import React, { Component } from 'react';
import './App.css';

import axios from 'axios';

const GridItem = (props) => (
  <div className="grid__flex">
    <img className="grid__img" src={props.image} />
  </div>
)

class App extends Component {

  state = {
    error: null,
    isLoaded: false,
    items: []
  }

  getRepo = async (query, variables) => {
    try {
      const response = await axios.post(
        'https://api.github.com/graphql',
        {
          query: query,
          variables: variables
        },
        {
          headers: {
            Authorization: 'token ' + REACT_APP_API_KEY
          }
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {

    // This is the GraphQL query
    const query = `
    query {
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
    }
    `;

    // These variables are optional, leave empty for now
    const variables = {};

    // We call the method here to execute our async function
    this.getRepo(query, variables)

  }

  render() {

    const { error, isLoaded, items } = this.state;

    if (error) {
      return <div>{error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {

      return (
        <div className="grid">
          {items.map(item => (
            <GridItem key={item.id} image={item.coverImage.large} />
          ))}
        </div>
      );

    }
  }

}

export default App;
