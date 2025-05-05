import { createContext } from "./context";
import { createNextApiHandler } from "@trpc/server/adapters/next";
import { router } from "./trpc";
import { authRouter } from "./router/auth";
import { t } from "./trpc";
import { isAuthed } from "./middleware";

export const appRouter = router({
  auth: authRouter,
});

export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthed);

export type AppRouter = typeof appRouter;
