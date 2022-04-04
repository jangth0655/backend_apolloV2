import { gql } from "apollo-server";
export default gql`
  type CursorFollowersResult {
    ok: Boolean!
    error: String
    following: [User]
  }
  type Query {
    cursorFollowers(username: String!, cursor: Int): CursorFollowersResult
  }
`;
