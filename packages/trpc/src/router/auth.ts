import { protectedProcedure, publicProcedure } from "../index";
import { router } from "../trpc";
import { z } from "zod";
import { db, eq } from "@resume/db";
import { usersTable } from "@resume/db/schema";

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
  findExistringUser: protectedProcedure
    .input(z.object({ email: z.string() }))
    .query(({ input }) => {
      const existringUser = db
        .select()
        .from(usersTable)
        .where(eq(usersTable, input.email))
        .limit(1);
    }),
});
