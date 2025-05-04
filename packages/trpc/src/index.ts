import { createContext } from "./context";
import { createNextApiHandler } from "@trpc/server/adapters/next";
import { router } from "./trpc";
import { authRouter } from "./router/auth";

export const appRouter = router({
  auth: authRouter,
});

export type appRouter = typeof appRouter;
