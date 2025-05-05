import { cookies } from "next/headers";
import { verifyToken } from "@resume/auth/session";

export async function createContext() {
  const token = (await cookies()).get("session")?.value;
  const user = token ? await verifyToken(token) : null;

  return { user };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
