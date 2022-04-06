import { Resolvers } from "../types";

const resolvers: Resolvers = {
  Photo: {
    user: ({ userId }, {}, { client }) => {
      return client.user.findUnique({
        where: {
          id: userId,
        },
      });
    },
    hashtags: ({ id }, {}, { client }) =>
      client.hashtag.findMany({
        where: {
          photos: {
            some: {
              id,
            },
          },
        },
      }),
    likes: ({ id }, {}, { client }) =>
      client.like.count({
        where: {
          photoId: id,
        },
      }),
  },
  Hashtag: {
    totalPhotos: ({ id }, {}, { client }) =>
      client.photo.count({
        where: {
          hashtags: {
            some: {
              id,
            },
          },
        },
      }),
    photos: ({ id }, { page }, { client }) => {
      if (!page) {
        page = 1;
      }
      const pageSize = 5;
      return client.photo.findMany({
        where: {
          hashtags: {
            some: {
              id,
            },
          },
        },
        take: pageSize,
        skip: (1 - page) * pageSize,
      });
    },
  },
};

export default resolvers;
