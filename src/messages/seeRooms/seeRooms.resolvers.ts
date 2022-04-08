import { protectedResolver } from "../../users/users.utils";
import { Resolvers } from "./../../types.d";
const resolvers: Resolvers = {
  Query: {
    seeRooms: protectedResolver(async (_, {}, { client, loggedInUser }) =>
      client.room.findMany({
        where: {
          users: {
            some: {
              id: loggedInUser.id,
            },
          },
        },
      })
    ),
  },
};

export default resolvers;
