import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";
import { processHashtags } from "../photos.utils";

const resolvers: Resolvers = {
  Mutation: {
    uploadPhoto: protectedResolver(
      async (_, { file, caption }, { loggedInUser, client }) => {
        if (!loggedInUser) {
          return false;
        }
        let hashtagsObj = null;
        if (caption) {
          hashtagsObj = processHashtags(caption);
        }
        return await client.photo.create({
          data: {
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
            file,
            caption,
            ...(hashtagsObj.length > 0 && {
              hashtags: {
                connectOrCreate: hashtagsObj,
              },
            }),
          },
        });
        //save the photo WITH the parsed hashtags
        // add the photo to the hashtags
      }
    ),
  },
};

export default resolvers;
