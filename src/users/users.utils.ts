import client from "../client";
import * as jwt from "jsonwebtoken";
import { Resolver } from "../types";

export const getUser = async (token: string) => {
  try {
    if (!token) {
      return null;
    }
    const verifiedToken: any = await jwt.verify(token, process.env.SECRET_KEY);
    if ("id" in verifiedToken) {
      const user = await client.user.findUnique({
        where: {
          id: verifiedToken["id"],
        },
      });
      if (user) {
        return user;
      }
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const protectedResolver =
  (resolver: Resolver) => (root, args, context, info) => {
    if (!context.loggedInUser) {
      return {
        ok: false,
        error: "Plz log in to perform this action.",
      };
    }
    return resolver(root, args, context, info);
  };
