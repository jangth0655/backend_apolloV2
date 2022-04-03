import "dotenv/config";
import { getUser } from "./users/users.utils";
import { resolvers, typeDefs } from "./schema";
import { ApolloServer } from "apollo-server-express";
import client from "./client";

import express = require("express");
import * as logger from "morgan";

const PORT = process.env.PORT;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    return {
      loggedInUser: await getUser(req.headers.token),
      client,
    };
  },
});

const app = express();
app.use(logger("tiny"));
server.applyMiddleware({ app });
app.listen({ port: PORT }, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT} ✅`);
});
