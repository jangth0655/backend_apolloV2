import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seeFollowers: async (_, { username, page }, { client }) => {
      const ok = await client.user.findUnique({
        where: { username },
        select: { id: true },
      });
      if (!ok) {
        return {
          ok: false,
          error: "User does not exist",
        };
      }

      const followers = await client.user
        .findUnique({
          where: {
            username,
          },
        })
        .followers({
          take: 5,
          skip: (page - 1) * 5,
        });
      const totalFollowers = await client.user.count({
        where: {
          following: {
            some: {
              username,
            },
          },
        },
      });
      console.log(totalFollowers);
      return {
        ok: true,
        followers,
        totalPages: totalFollowers,
      };
    },
  },
};

export default resolvers;
