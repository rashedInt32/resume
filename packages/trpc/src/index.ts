// packages/trpc/src/index.ts
import { router, createCallerFactory } from "./trpc";
import { authRouter } from "./router/auth";
import { userRouter } from "./router/user";
import { Context } from "./context";

export const appRouter = router({
  auth: authRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;

// Create a caller for server-side calls
// Correct: Create a function to make a caller from user/session
export const createCaller = (ctx: Context) =>
  createCallerFactory(appRouter)(ctx);
