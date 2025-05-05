import { TRPCError } from "@trpc/server";
import { middleware } from "./trpc";

export const isAuthed = middleware(({ ctx, next }) => {
  if (!ctx.user) throw new TRPCError({ code: "UNAUTHORIZED" });
  return next({ ctx: { user: ctx.user } });
});
