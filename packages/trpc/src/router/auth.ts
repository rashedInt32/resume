import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const authRouter = router({
  login: publicProcedure
    .input(z.object({ email: z.string(), password: z.string() }))
    .mutation(async ({ input }) => {}),
});
