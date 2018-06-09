import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { RestLink } from 'apollo-link-rest';
import { withClientState } from 'apollo-link-state';
import gql from 'graphql-tag';
import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import * as ReactDOM from 'react-dom';

import './index.scss';
import Prototype from './prototype/Prototype';
import registerServiceWorker from './registerServiceWorker';

const cache = new InMemoryCache();

const restLink = new RestLink({
  uri: 'https://qiita.com/api/v2/'
});

const stateLink = withClientState({
  cache,
  defaults: {},
  resolvers: {}
});

const link = ApolloLink.from([stateLink, restLink]);

const client = new ApolloClient({
  cache,
  link
});

const query = gql`
  query qiita {
    schemaInfo @rest(type: "Person", path: "schema") {
      required
    }
  }
`;

// Invoke the query and log the person's name
client.query({ query }).then(response => {
  console.log(response.data);
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Prototype />
  </ApolloProvider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
