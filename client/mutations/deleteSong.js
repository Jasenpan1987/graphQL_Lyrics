import gql from "graphql-tag";

export default gql`
    mutation RemoveById($id: ID){
        deleteSong(id: $id){
            title,
            id
        }
    }
`;