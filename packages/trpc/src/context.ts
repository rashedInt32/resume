import type { SessionData } from "@resume/auth/session";

export const createContext = ({ user }: { user: SessionData | null }) => {
  return { user };
};

export type Context = Awaited<ReturnType<typeof createContext>>;
