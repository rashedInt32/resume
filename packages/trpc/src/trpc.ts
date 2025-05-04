import { initTRPC } from "@trpc/server";
import type { Context } from "./context";
import superjson from "superjson";
import { isAuthed } from "./middleware";

export const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      message: error.message,
      data: {
        ...shape.data,
        zodError: error.cause instanceof Error ? error.cause : null,
      },
    };
  },
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthed);
