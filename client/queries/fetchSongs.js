import gql from "graphql-tag";

export default gql`
    query {
        songs {
            title
            id
        }
    }
`;