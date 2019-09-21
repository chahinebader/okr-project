import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import * as serviceWorker from './serviceWorker';
import App from './App'; 

const cache = new InMemoryCache();

const GITHUB_BASE_URL = 'http://localhost:4000/graphql';

const httpLink = new HttpLink({
  uri: GITHUB_BASE_URL
});

const client = new ApolloClient({
  link: httpLink,
  cache,
});
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
    document.getElementById('root'),
  );
  ReactDOM.unmountComponentAtNode(div);
});
