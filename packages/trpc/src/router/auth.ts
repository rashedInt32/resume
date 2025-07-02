import { db } from "@resume/db";
import { protectedProcedure, publicProcedure } from "../trpc";
import { router } from "../trpc";
import { z } from "zod";
import { usersTable } from "@resume/db/schema";
import { eq } from "drizzle-orm";
import { comparePasswords } from "@resume/auth/session";

export const authRouter = router({
  login: publicProcedure
    .input(z.object({ email: z.string(), password: z.string() }))
    .mutation(async ({ input }) => {
      const user = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, input.email))
        .limit(1);

      if (user.length < 0) {
        return { error: "Email not found." };
      }

      const isPasswordMatched = await comparePasswords(
        input.password,
        user[0]?.password as string,
      );
      if (!isPasswordMatched) {
        return { error: "Wrong password" };
      }

      return {
        username: user[0]?.username,
        email: user[0]?.email,
      };
    }),
  signUp: publicProcedure
    .input(
      z.object({
        username: z.string(),
        email: z.string(),
        password: z.string(),
      }),
    )
    .mutation(async ({ input }) => {}),
});
