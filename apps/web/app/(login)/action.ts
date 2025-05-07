"use server";
import { z } from "zod";
import { ActionState, validatedAction } from "@resume/auth/middleware";
import { serverTrpc } from "@/lib/trpc-client/client";
import { comparePasswords, hashedPassword } from "@resume/auth/session";

const signInSchema = z.object({
  email: z.string().email({ message: "Enter valid email" }),
  password: z.string(),
});

export const signIn = validatedAction(signInSchema, async (data, formData) => {
  const { email, password } = data;
  const existingUser = await serverTrpc.user.findUserbyEmail.query({ email });
  console.log(existingUser);
  if (!existingUser) {
    return {
      error: "Email not found",
      email,
      password,
    };
  }
  console.log("check this block");
});

const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  username: z.string(),
});

function when<T, U>(
  condition: boolean | (() => boolean),
  onTrue: T | (() => T),
  onFalse: U | (() => U),
): T | U {
  const evaluate = <V>(value: V | (() => V)): V =>
    typeof value === "function" ? (value as () => V)() : value;
  return evaluate(condition) ? evaluate(onTrue) : evaluate(onFalse);
}

export const signUp = validatedAction(signUpSchema, async (data, FormData) => {
  const { email, password, username } = data;
  const existingUser = await serverTrpc.user.findUserbyEmail.query({ email });

  if (existingUser !== null) {
    return { error: "User already exists" };
  }

  const passwordhash = await hashedPassword(password);
  const createNewUser = await serverTrpc.user.create.mutate({
    email,
    password: passwordhash,
    username,
  });

  console.log(createNewUser);
});
