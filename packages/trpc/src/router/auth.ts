import { protectedProcedure, publicProcedure } from "../trpc";
import { router } from "../trpc";
import { z } from "zod";

export const authRouter = router({
  login: publicProcedure
    .input(z.object({ email: z.string(), password: z.string() }))
    .mutation(async ({ input }) => {}),
  signUp: publicProcedure
    .input(
      z.object({
        username: z.string(),
        email: z.string(),
        password: z.string(),
      }),
    )
    .mutation(async ({ input }) => {}),
  ping: publicProcedure.query(() => "pong"),
});
