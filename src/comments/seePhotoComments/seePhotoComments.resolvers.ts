import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seePhotoComments: async (_, { id, page = 1 }, { client }) => {
      const pageSize = 5;
      if (!page) {
        page = 1;
      }
      const comments = await client.comment.findMany({
        where: {
          photoId: id,
        },
        take: pageSize,
        skip: (page - 1) * pageSize,
        orderBy: {
          createdAt: "asc",
        },
      });
      return comments;
    },
  },
};

export default resolvers;
