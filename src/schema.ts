/* const loadFilesSync = require("graphql-tools")

const loadedTypes = loadFilesSync(`${__dirname}/`) */

import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
//import { makeExecutableSchema } from "apollo-server";

const loadedType = loadFilesSync(`${__dirname}/**/*.typeDefs.ts`);
const loadedResolvers = loadFilesSync(`${__dirname}/**/*.resolvers.ts`);

export const typeDefs = mergeTypeDefs(loadedType);
export const resolvers: any = mergeResolvers(loadedResolvers);

//const schema = makeExecutableSchema({ typeDefs, resolvers });
