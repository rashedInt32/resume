"use server";
import { z } from "zod";
import { ActionState, validatedAction } from "@resume/auth/middleware";
import { serverTrpc } from "@/lib/trpc-client/client";
import {
  comparePasswords,
  hashedPassword,
  setSession,
} from "@resume/auth/session";
import { User } from "@resume/db/schema";
import { redirect } from "next/navigation";

export async function handleSessionAndRredirect(user: User) {
  await setSession(user);
  redirect("/");
}

const signInSchema = z.object({
  email: z.string().email({ message: "Enter valid email" }),
  password: z.string(),
});

export const signIn = validatedAction(signInSchema, async (data, formData) => {
  const { email, password } = data;

  const user = await serverTrpc.user.findUserbyEmail.query({ email });

  if (!user) {
    return { error: "Email not found" };
  }

  const isMatch = await comparePasswords(password, user.password as string);
  if (!isMatch) {
    return { error: "Incorrect password" };
  }

  await handleSessionAndRredirect(user as User);
});

const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  username: z.string(),
});

export const signUp = validatedAction(signUpSchema, async (data, FormData) => {
  const { email, password, username } = data;
  const existingUser = await serverTrpc.user.findUserByFields.query({
    email,
    username,
  });
  if (existingUser?.email === email) {
    return { error: "Email already taken" };
  }

  if (existingUser?.username === username) {
    return { error: "Username already taken" };
  }

  const hashed = await hashedPassword(password);
  const newUser = await serverTrpc.user.create.mutate({
    email,
    password: hashed,
    username,
  });

  await handleSessionAndRredirect(newUser as User);
});
