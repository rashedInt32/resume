import { type NextApiRequest, type NextApiResponse } from "next";
import { verifyToken } from "@resume/auth/session";

export async function createContext({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}) {
  const user = await verifyToken(req.headers.authorization as string);
  return { req, res, user };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
