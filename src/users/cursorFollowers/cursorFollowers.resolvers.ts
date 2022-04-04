import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    cursorFollowers: async (_, { username, cursor }, { client }) => {
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
      const following = await client.user
        .findUnique({ where: { username } })
        .following({
          take: 5,
          skip: cursor ? 1 : 0,
          ...(cursor && { cursor: { id: cursor } }),
        });
      console.log(following);
      return {
        ok: true,
        following,
      };
    },
  },
};

export default resolvers;
