import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seeProfile: async (_, { username }, { loggedInUser, client }) =>
      client.user.findUnique({
        where: {
          username,
        },
      }),
  },
};

export default resolvers;
