import ac from 'https://dev.jspm.io/apollo-client';
import imc from 'https://dev.jspm.io/apollo-cache-inmemory';
import hl from 'https://dev.jspm.io/apollo-link-http';

// work around jspm.io restriction to only support default exports
const { ApolloClient } = ac;
const { InMemoryCache } = imc;
const { HttpLink } = hl;

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'https://swapi-graphql.netlify.com/.netlify/functions/index',
});

export default new ApolloClient({ cache, link });
