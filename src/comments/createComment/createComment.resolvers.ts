import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";

const resolvers: Resolvers = {
  Mutation: {
    createComment: protectedResolver(
      async (_, { id, payload }, { loggedInUser, client }) => {
        const ok = await client.photo.findUnique({
          where: {
            id,
          },
          select: {
            id: true,
          },
        });
        if (!ok) {
          return {
            ok: false,
            error: "photo not found",
          };
        }
        await client.comment.create({
          data: {
            payload,
            photo: {
              connect: {
                id,
              },
            },
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
          },
        });
        return {
          ok: true,
        };
      }
    ),
  },
};

export default resolvers;
