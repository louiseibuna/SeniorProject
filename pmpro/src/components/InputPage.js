import React, { Component } from 'react';
import axios from 'axios';

//generate your own personal token in an .env file
const axiosGithubGraphQL = axios.create({
  baseURL: 'https://api.github.com/graphql',
  headers: {
    Authorization: `bearer ${
      process.env.GH_PERSONAL_ACCESS_TOKEN
    }`,
  }
});

const GET_ISSUES_OF_REPOSITORY = `
  query ($organization: String!, $repository: String!, $cursor: String) {
    organization(login: $organization) {
      name
      url
      repository(name: $repository) {
        id
        name
        url
        stargazers {
          totalCount
        }
        viewerHasStarred
        issues(first: 5, after: $cursor, states: [OPEN]) {
          edges {
            node {
              id
              title
              url
              reactions(last: 3) {
                edges {
                  node {
                    id
                    content
                  }
                }
              }
            }
          }
          totalCount
          pageInfo {
            endCursor
            hasNextPage
          }
        }
      }
    }
  }
`;

const getIssuesOfRepository = (path, cursor) => {
  const [organization, repository] = path.split('/');

  return axiosGithubGraphQL.post('', {
    query: GET_ISSUES_OF_REPOSITORY,
    variables: { organization, repository, cursor },
  });
};

const resolveIssuesQuery = (queryResult, cursor) => state => {
  const { data, errors } = queryResult.data;

  if (!cursor) {
    return {
      organization: data.organization,
      errors,
    };
  }

  const { edges: oldIssues } = state.organization.repository.issues;
  const { edges: newIssues } = data.organization.repository.issues;
  const updatedIssues = [...oldIssues, ...newIssues];

  return {
    organization: {
      ...data.organization,
      repository: {
        ...data.organization.repository,
        issues: {
          ...data.organization.repository.issues,
          edges: updatedIssues,
        },
      },
    },
    errors,
  };
};


class InputPage extends Component {
    state = {
    path: 'scrapy/scrapy',

    };

    componentDidMount() {
      this.onFetchFromGitHub(this.state.path);
    }

    onChange = event => {
        this.setState({ path: event.target.value });
    };

    onSubmit = event => {
      this.onFetchFromGitHub(this.state.path);
  
      event.preventDefault();
    };

    onFetchFromGitHub = (path, cursor) => {
      getIssuesOfRepository(path, cursor).then(queryResult =>
        this.setState(resolveIssuesQuery(queryResult, cursor)),
      );
    };

    render() {
        const { path, organization, errors}  = this.state;
        const newLocal = (<p>No information yet ...</p>);
        
        return (
          <div>
            <form onSubmit={this.onSubmit}>
              <label htmlFor="url">
                Owner/Repository
              </label> &nbsp;
              <input
                id="url"
                type="text"
                value={path}
                onChange={this.onChange}
                style={{ width: '300px' }}
              />
              <button type="submit">Search</button>
            </form>

            <hr />
           {organization ? 
              <Organization
            organization={organization}
            errors={errors}
            onFetchMoreIssues={this.onFetchMoreIssues}
            onStarRepository={this.onStarRepository}
              />
             : newLocal}

          </div>
        );
      }
    }

    const Organization = ({
      organization,
      errors,
      onFetchMoreIssues,
      onStarRepository,
    }) => {
      if (errors) {
        return (
          <p>
            <strong>Something went wrong:</strong>
            {errors.map(error => error.message).join(' ')}
          </p>
        );
      }
    
      return (
        <div>
          <p>
            <strong>Issues from Organization:</strong>
            <a href={organization.url}>{organization.name}</a>
          </p>
          <Repository
            repository={organization.repository}
            onFetchMoreIssues={onFetchMoreIssues}
            onStarRepository={onStarRepository}
          />
        </div>
      );
    };

    const Repository = ({
      repository,
      onFetchMoreIssues,
      onStarRepository,
    }) => (
      <div>
        <p>
          <strong>In Repository:</strong>
          <a href={repository.url}>{repository.name}</a>
        </p>
    
        <button
          type="button"
          onClick={() =>
            onStarRepository(repository.id, repository.viewerHasStarred)
          }
        >
          {repository.stargazers.totalCount}
          {repository.viewerHasStarred ? ' Unstar' : ' Star'}
        </button>
    
        <ul>
          {repository.issues.edges.map(issue => (
            <li key={issue.node.id}>
              <a href={issue.node.url}>{issue.node.title}</a>
    
              <ul>
                {issue.node.reactions.edges.map(reaction => (
                  <li key={reaction.node.id}>{reaction.node.content}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
    
        <hr />
    
        {repository.issues.pageInfo.hasNextPage && (
          <button onClick={onFetchMoreIssues}>More</button>
        )}
      </div>
    );
export default InputPage;
