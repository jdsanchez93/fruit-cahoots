import Something from '@/components/something';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

const client = new ApolloClient({
    uri: 'http://localhost:3000/api/graphql',
    cache: new InMemoryCache(),
});

// const client = ...

// client
//     .query({
//         query: gql`
//       query GetLocations {
//         hello
//       }
//     `,
//     })
//     .then((result) => console.log(result));


export default function Test() {
    return (
        <ApolloProvider client={client}>
            <Something />
        </ApolloProvider>
    );
}