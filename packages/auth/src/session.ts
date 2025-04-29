import { compare } from "bcryptjs";
import { jwtVerify, SignJWT } from "jose";

export const setSecretKey = (key: string) => new TextEncoder().encode(key);
const SALT_ROUND = 10;

export async function comparePasswords(
  palainTextPassword: string,
  hashedPassword: string,
) {
  return compare(palainTextPassword, hashedPassword);
}

type SessionData = {
  user: { id: number };
  expires: string;
};

export async function signToken(
  payload: SessionData,
  key: Uint8Array<ArrayBufferLike>,
) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1 day from now")
    .sign(key);
}

export async function verifyToken(
  input: string,
  key: Uint8Array<ArrayBufferLike>,
) {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload as SessionData;
}
