import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { NavBar } from './components/NavBar';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import Courses from './Courses';
import './App.css';

const client = new ApolloClient({
    // this is the Apollo endpoint
    uri: "https://vm8mjvrnv3.lp.gql.zone/graphql"
});

const App = () => (
    <ApolloProvider client={client}>
        <div>
            <Courses />
        </div>
    </ApolloProvider>
)

// function App() {
//   return (
//     <React.Fragment>
//       <Router>
//         <NavBar>
//           <Layout>
//             <Switch>
//               <Route exact path="/" component={Dashboard} />
//             </Switch>
//           </Layout>
//         </NavBar>
//       </Router>
//
//     </React.Fragment>
//   );
// }

export default App;
