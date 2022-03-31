/* const loadFilesSync = require("graphql-tools")

const loadedTypes = loadFilesSync(`${__dirname}/`) */

import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import { IResolvers, makeExecutableSchema } from "apollo-server";

const loadedType = loadFilesSync(`${__dirname}/**/*.typeDefs.{ts,js}`);
const loadedResolvers = loadFilesSync(
  `${__dirname}/**/*.{queries,mutations}.ts`
);

const typeDefs = mergeTypeDefs(loadedType);
const resolvers: any = mergeResolvers(loadedResolvers);

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
