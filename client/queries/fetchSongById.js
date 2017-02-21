import gql from "graphql-tag";

// ID! means required type of ID
export default gql`
    query FetchSongById($id: ID!){ 
        song(id: $id){
            id,
            title,
            lyrics{
                id,
                content,
                likes
            }
        }
    }`
;