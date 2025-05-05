import { protectedProcedure } from "../index";
import { router } from "../trpc";
import { z } from "zod";
import { db, eq } from "@resume/db";
import { usersTable } from "@resume/db/schema";

export const authRouter = router({
  findExistringUser: protectedProcedure
    .input(z.object({ email: z.string() }))
    .query(({ input }) => {
      const existingUser = db
        .select()
        .from(usersTable)
        .where(eq(usersTable, input.email))
        .limit(1);
      return existingUser[0] ?? null;
    }),
});
