import { router } from "./trpc";
import { authRouter } from "./router/auth";
import { userRouter } from "./router/user";
import { t } from "./trpc";
import { isAuthed } from "./middleware";
import { createContext } from "vm";

export const appRouter = router({
  auth: authRouter,
  user: userRouter,
});

export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthed);

export const createCaller = async () => {
  const ctx = createContext();
  return appRouter.createCaller(ctx);
};

export type AppRouter = typeof appRouter;
