import { handleDeletePhotoFromAWS } from "../../shared/shared.utils";
import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";

const resolvers: Resolvers = {
  Mutation: {
    deletePhoto: protectedResolver(
      async (_, { id }, { client, loggedInUser }) => {
        const photo = await client.photo.findUnique({
          where: {
            id,
          },
          select: {
            userId: true,
            file: true,
          },
        });
        if (!photo) {
          return {
            ok: false,
            error: "photo no found",
          };
        } else if (photo.userId !== loggedInUser.id) {
          return {
            ok: false,
            error: "Not authorized",
          };
        } else {
          await client.photo.delete({
            where: {
              id,
            },
          });
          handleDeletePhotoFromAWS(photo.file);
          return {
            ok: true,
          };
        }
      }
    ),
  },
};

export default resolvers;
