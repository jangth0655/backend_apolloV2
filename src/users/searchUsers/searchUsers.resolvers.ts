import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    searchUsers: async (_, { keyword, page }, { client }) => {
      const pageSize = 5;
      if (!page) {
        return (page = 1);
      }
      const users = await client.user.findMany({
        where: {
          username: {
            startsWith: keyword.toLowerCase(),
          },
        },
        select: {
          id: true,
          username: true,
        },
        take: pageSize,
        skip: (page - 1) * pageSize,
      });
      if (!users) {
        return;
      }
      return users;
    },
  },
};

export default resolvers;
