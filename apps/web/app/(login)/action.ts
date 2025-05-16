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

const signInSchema = z.object({
  email: z.string().email({ message: "Enter valid email" }),
  password: z.string(),
});

export const signIn = validatedAction(signInSchema, async (data, formData) => {
  const { email, password } = data;
  const existingUser = await serverTrpc.user.findUserbyEmail.query({ email });
  if (!existingUser) {
    return {
      error: "Email not found",
      email,
      password,
    };
  }

  const isPasswordMatch = await comparePasswords(
    password,
    existingUser.password as string,
  );
  if (!isPasswordMatch) return { error: "Password not matched" };
  await setSession(existingUser as User);
  redirect("/");
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
  if (existingUser?.email === email)
    return { error: "Email already taken", email, username };
  if (existingUser?.username === username)
    return { error: "Username already taken", email, username };

  const passwordhash = await hashedPassword(password);
  const createNewUser = await serverTrpc.user.create.mutate({
    email,
    password: passwordhash,
    username,
  });

  await setSession(createNewUser as User);
  redirect("/");
});
