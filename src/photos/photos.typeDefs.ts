import { gql } from "apollo-server";
export default gql`
  type Photo {
    id: Int!
    createdAt: String
    updatedAt: String
    user: User!
    file: String!
    caption: String
    hashtags: [Hashtag]
    likes: Int!
    isMine: Boolean!
    comments: Int!
  }

  type Hashtag {
    id: Int!
    createdAt: String
    updatedAt: String
    hashtag: String
    photos(page: Int): [Photo]
    totalPhotos: Int!
  }

  type Like {
    id: Int!
    createdAt: String
    updatedAt: String
    photo: Photo!
  }
`;
