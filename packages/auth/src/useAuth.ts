import { z } from "zod";
import { ActionState, validatedAction } from "./middleware";
const signInSchema = z.object({
  email: z.string().email({ message: "Enter valid email" }),
  password: z.string(),
});

export const signIn = validatedAction(signInSchema, async (data, formData) => {
  const { email, password } = data;
});

export async function signUp(state: ActionState, formData: FormData) {
  console.log(formData);
}
