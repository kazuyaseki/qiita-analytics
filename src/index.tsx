import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { RestLink } from 'apollo-link-rest';
import { withClientState } from 'apollo-link-state';
import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import * as ReactDOM from 'react-dom';

import './index.scss';
import Prototype from './prototype/Prototype';
import registerServiceWorker from './registerServiceWorker';

const cache = new InMemoryCache();

persistCache({
  cache,
  storage: window.localStorage
});

const restLink = new RestLink({
  headers: {
    authorization: `Bearer ${process.env.REACT_APP_QIITA_TOKEN}`
  },
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

ReactDOM.render(
  <ApolloProvider client={client}>
    <Prototype />
  </ApolloProvider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
