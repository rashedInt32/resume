import { protectedProcedure, publicProcedure } from "../trpc";
import { router } from "../trpc";
import { z } from "zod";
import { db, eq, or, Column } from "@resume/db";
import { type NewUser, usersTable } from "@resume/db/schema";

const dynamicSchema = z.record(z.string(), z.string());

export const userRouter = router({
  findUserByFields: publicProcedure
    .input(dynamicSchema)
    .query(async ({ input }) => {
      const condition = Object.entries(input).map(([key, value]) => {
        const column = usersTable[key as keyof typeof usersTable] as Column;
        return eq(column, value);
      });

      if (condition.length === 0) {
        return null;
      }

      const user = await db
        .select()
        .from(usersTable)
        .where(or(...condition))
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
          password: user[0]?.password,
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
