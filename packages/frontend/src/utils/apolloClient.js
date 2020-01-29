import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const BASE_URL = process.env.TRAKKR_API_URL || {};
const cache = new InMemoryCache();
const httpLink = new HttpLink({
  uri: BASE_URL,
});
const apolloClient = new ApolloClient({
  cache,
  link: httpLink,
});

export default apolloClient;