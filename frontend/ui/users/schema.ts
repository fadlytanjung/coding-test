import { z } from "zod";

export const AddUserSchema = z
  .object({
    username: z.string().min(1, "Username is required"),
    fullname: z.string().min(1, "Fullname is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type AddUserValues = z.infer<typeof AddUserSchema>;
