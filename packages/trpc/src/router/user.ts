import { protectedProcedure, publicProcedure } from "../index";
import { router } from "../trpc";
import { z } from "zod";
import { db, eq } from "@resume/db";
import { type NewUser, usersTable } from "@resume/db/schema";

export const userRouter = router({
  findUserbyEmail: protectedProcedure
    .input(z.object({ email: z.string() }))
    .query(async ({ input }) => {
      const user = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, input.email))
        .limit(1);
      return user ?? null;
    }),

  create: publicProcedure
    .input(
      z.object({
        username: z.string(),
        password: z.string(),
        email: z.string().email(),
        createdAt: z.date().optional(),
        updatedAt: z.date().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const [createdUser] = await db
        .insert(usersTable)
        .values(input)
        .returning();
      return createdUser;
    }),
});
