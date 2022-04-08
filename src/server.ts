import "dotenv/config";
import { getUser } from "./users/users.utils";
import { resolvers, typeDefs } from "./schema";
import client from "./client";
import * as http from "http";
import { ApolloServer } from "apollo-server-express";
import { graphqlUploadExpress } from "graphql-upload";

import express = require("express");
import * as logger from "morgan";

const PORT = process.env.PORT;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  uploads: false,
  context: async (ctx) => {
    if (ctx.req) {
      return {
        loggedInUser: await getUser(ctx.req.headers?.token),
        client,
      };
    } else {
      const {
        connection: {
          context: { loggedInUser },
        },
      } = ctx;
      return {
        loggedInUser,
      };
    }
  },
  subscriptions: {
    onConnect: async ({ token }: any) => {
      if (!token) {
        throw new Error("You can not listen");
      }
      const loggedInUser = await getUser(token);
      return {
        loggedInUser,
      };
    },
  },
});

const app = express();
app.use(graphqlUploadExpress());
app.use(logger("tiny"));
app.use("/static", express.static("uploads"));
server.applyMiddleware({ app });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT} ✅`);
});
