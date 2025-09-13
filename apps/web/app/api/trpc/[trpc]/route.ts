import { appRouter } from "@resume/trpc";
import { createContext } from "@resume/trpc/context";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@resume/auth/session";

const handler = async (req: NextRequest) => {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session")?.value;

  let user = null;
  if (sessionToken) {
    try {
      user = await verifyToken(sessionToken);
    } catch (err) {
      console.error("Session verification failed:", err);
    }
  }
  return fetchRequestHandler({
    endpoint: "api/trpc",
    req,
    router: appRouter,
    createContext: () => createContext({ user }),
  });
};

export { handler as GET, handler as POST };
