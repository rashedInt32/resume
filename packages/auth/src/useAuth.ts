import { z } from "zod";
import { ActionState, validatedAction } from "./middleware";
const signInSchema = z.object({
  email: z.string().email({ message: "Enter valid email" }),
  password: z.string(),
});

export const signIn = validatedAction(signInSchema, async (data, formData) => {
  console.log("called sigIn");
  console.log(data, formData);
});

export async function signUp(state: ActionState, formData: FormData) {
  console.log(formData);
}
