import { gql } from "apollo-server";
export default gql`
  type User {
    id: Int!
    firstName: String!
    lastName: String
    username: String!
    email: String
    createdAt: String
    updatedAt: String
    avatar: String
    bio: String
    following: [User]
    followers: [User]
    totalFollowings: Int!
    totalFollowers: Int!
    isMe: Boolean!
    isFollowing: Boolean!
  }
`;
