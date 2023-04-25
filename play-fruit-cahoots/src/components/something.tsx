import { useQuery, gql } from '@apollo/client';

const GET_LOCATIONS = gql`
  query GetLocations {
    hello
  }
`;

export default function Something() {
    const { loading, error, data } = useQuery(GET_LOCATIONS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    return (
        <div>
            <h2>My first Apollo app 🚀</h2>
            <h3>{data.hello}</h3>
        </div>
    );
}