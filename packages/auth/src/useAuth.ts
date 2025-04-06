import { z } from "zod";
import { ActionState } from "./middleware";
const signInSchema = z.object({
  email: z.string().email(),
});
export async function signIn(state: ActionState, formData: FormData) {
  console.log(formData);
}

export async function signUp(state: ActionState, formData: FormData) {
  console.log(formData);
}
