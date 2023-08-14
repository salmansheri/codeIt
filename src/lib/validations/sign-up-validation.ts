import { z } from "zod";

export const SigninValidation = z.object({
  name: z.string().min(3),
  email: z.string().min(3).email(),
  password: z.string().min(3),
  imageUrl: z.string().optional(),
});

export type SigninType = z.infer<typeof SigninValidation>;
