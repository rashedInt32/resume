import { protectedProcedure, publicProcedure } from "../trpc";
import { router } from "../trpc";
import { z } from "zod";
import { db, eq, or } from "@resume/db";
import { type NewUser, usersTable } from "@resume/db/schema";

export const userRouter = router({
  findUserByFields: publicProcedure
    .input(z.object({ email: z.string(), username: z.string() }))
    .query(async ({ input }) => {
      const user = await db
        .select()
        .from(usersTable)
        .where(
          or(
            eq(usersTable.email, input.email),
            eq(usersTable.username, input.username),
          ),
        )
        .limit(1);
      if (user.length > 0) {
        return {
          username: user[0]?.username,
          email: user[0]?.email,
        };
      }
      return null;
    }),
  findUserbyEmail: publicProcedure
    .input(z.object({ email: z.string() }))
    .query(async ({ input }) => {
      const user = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, input.email))
        .limit(1);
      if (user.length > 0) {
        return {
          username: user[0]?.username,
          email: user[0]?.email,
        };
      }
      return null;
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
