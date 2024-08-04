import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client/index.js";
import { setContext } from "@apollo/client/link/context";

const accessToken = import.meta.env.VITE_ACCESS_TOKEN;
const contentUrl = import.meta.env.VITE_CONTENT_URL;

const httpLink = createHttpLink({
  uri: contentUrl,
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      Authorization: `Bearer ${accessToken}`,
    },
  };
});

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  ssrMode: true,
  cache: new InMemoryCache(),
});
