import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seePhoto: (_, { id }, { client }) => {
      const photo = client.photo.findUnique({
        where: {
          id,
        },
      });
      if (!photo) {
        return {
          ok: false,
          error: "Not found",
        };
      } else {
        return {
          ok: true,
          photo,
        };
      }
    },
  },
};

export default resolvers;
