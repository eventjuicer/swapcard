import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const createApolloClient = () => {
  const httpLink = createHttpLink({
    uri: 'https://developer.swapcard.com/event-admin/graphql',
    headers: {
      "Authorization": `${process.env.SWAPCARD_API_KEY}` 
    }
  });

  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;