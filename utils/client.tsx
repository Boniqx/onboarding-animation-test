import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Cookies from 'js-cookie';

const httpLink = createHttpLink({
  uri: 'https://frontend-engineer-onboarding-api-thxaa.ondigitalocean.app/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = Cookies.get('token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          products: {
            // Don't cache separate results based on
            // any of this field's arguments.
            keyArgs: false,
            // Concatenate the incoming list items with
            // the existing list items.
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            merge(existing = [], incoming): any {
              return incoming;
            },
          },
        },
      },
    },
  }),
});

export default client;
