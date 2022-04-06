import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    searchPhotos: async (_, { keyword, page }, { client }) => {
      if (!page) {
        page = 1;
      }
      const pageSize = 5;
      return await client.photo.findMany({
        where: {
          caption: {
            startsWith: keyword,
          },
        },
        take: pageSize,
        skip: (page - 1) * pageSize,
      });
    },
  },
};

export default resolvers;
