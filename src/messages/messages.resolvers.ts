import client from "../client";
import { Resolvers } from "../types";

const resolvers: Resolvers = {
  Room: {
    users: ({ id }) =>
      client.user.findMany({
        where: {
          rooms: {
            some: {
              id,
            },
          },
        },
      }),
    messages: ({ id }) =>
      client.message.findMany({
        where: {
          roomId: id,
        },
      }),
    unreadTotal: async ({ id }, {}, { loggedInUser }) => {
      if (!loggedInUser) {
        return 0;
      }
      return await client.message.count({
        where: {
          roomId: id,
          read: false,
          user: {
            id: {
              not: loggedInUser.id,
            },
          },
        },
      });
    },
  },
  Message: {
    user: ({ id }) =>
      client.message
        .findUnique({
          where: { id },
        })
        .user(),
  },
};

export default resolvers;
