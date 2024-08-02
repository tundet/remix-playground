import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client/index.js";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: process.env.CONTENT_URL,
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    },
  };
});

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  ssrMode: true,
  cache: new InMemoryCache(),
});
