import { z } from "zod";

export const CredentialsSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Required"),
});

export const SignUpSchema = z.object({
  name: z.string().trim().min(1, "Required"),
  email: z.string().email(),
  password: z.string().min(6, "Minimum of 6 characters required"),
});