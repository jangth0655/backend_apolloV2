import { gql } from "apollo-server";
export default gql`
  type PhotoResponse {
    ok: Boolean!
    error: String
    photo: Photo
  }
  type Query {
    seePhoto(id: Int!): PhotoResponse
  }
`;
