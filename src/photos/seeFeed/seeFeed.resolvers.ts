import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";

const resolvers: Resolvers = {
  Query: {
    seeFeed: protectedResolver(async (_, {}, { client, loggedInUser }) => {
      const photos = await client.photo.findMany({
        where: {
          OR: [
            {
              user: {
                followers: {
                  some: {
                    id: loggedInUser.id,
                  },
                },
              },
            },
            {
              userId: loggedInUser.id,
            },
          ],
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      return photos;
    }),
  },
};
export default resolvers;
