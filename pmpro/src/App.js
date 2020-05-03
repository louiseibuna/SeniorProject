import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { NavBar } from './components/NavBar';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import './App.css';

// const client = new ApolloClient({
//     // this is the Apollo endpoint
//     uri: "https://api.github.com/graphql"
// });
//
// const App = () => (
//     <ApolloProvider client={client}>
//         <div>
//             <Column />
//         </div>
//     </ApolloProvider>
// )

function App() {
  return (
    <React.Fragment>
      <Router>
        <NavBar>
          <Layout>
            <Switch>
              <Route exact path="/" component={Dashboard} />
            </Switch>
          </Layout>
        </NavBar>
      </Router>

    </React.Fragment>
  );
}

export default App;
