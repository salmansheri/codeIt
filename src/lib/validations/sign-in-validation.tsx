import { z } from "zod";

export const SignInValidation = z.object({
  email: z.string().min(3).email(),
  password: z.string().min(3),
});

export type SignInType = z.infer<typeof SignInValidation>;
