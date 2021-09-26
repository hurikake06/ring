// import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from '@apollo/client/link/ws';
import { InMemoryCache } from 'apollo-cache-inmemory';

async function fetchGraphQL(text, variables) {
  // const REACT_APP_GITHUB_AUTH_TOKEN = process.env.REACT_APP_GITHUB_AUTH_TOKEN
  const HASURA_SECRET = 'hoge'

//   // Fetch data from GitHub's GraphQL API:
//   const response = await fetch('https://ring.hasura.app/v1/graphql', {
//     method: 'POST',
//     headers: {
//       Authorization: `bearer ${REACT_APP_GITHUB_AUTH_TOKEN}`,
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       query: text,
//       variables,
//     }),
//   })

//   // Get the response as JSON
//   return await response.json()
// }

const httpsLink = new HttpLink({
  uri: HTTPS_URL,
  headers: {
    'x-hasura-admin-secret': HASURA_SECRET
  }
});

const wssLink = new WebSocketLink({
  uri: WSS_URL,
  options: {
    reconnect: true,
    connectionParams: {
      headers: {
        'x-hasura-admin-secret': HASURA_SECRET
      }
    }
  }
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wssLink,
  httpsLink
);

const createApolloClient = () => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link
  });
};

export default createApolloClient