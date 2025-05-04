import { createNextApiHandler } from "@trpc/server/adapters/next";
import { createContext } from "./context";
import { appRouter } from "./index";

export const handler = createNextApiHandler({
  router: appRouter,
  createContext,
});
