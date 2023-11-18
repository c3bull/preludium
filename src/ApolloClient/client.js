import {ApolloClient, ApolloLink, HttpLink, InMemoryCache} from "@apollo/client";

const httpLink = new HttpLink({
    // uri: "https://48p1r2roz4.sse.codesandbox.io",
    // uri: "http://localhost:3002/graphql",
    uri: "https://preludium-api.onrender.com/graphql",
});

export const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([httpLink]),
});
