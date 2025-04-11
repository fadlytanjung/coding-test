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

export const UpdateUserSchema = z
  .object({
    username: z.string(),
    fullname: z.string().min(1, "Fullname is required"),
    current_password: z.string().optional(),
    new_password: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const { current_password, new_password } = data;
    if (current_password && !new_password) {
      ctx.addIssue({
        path: ["new_password"],
        message: "Both current and new password are required if one is provided",
        code: z.ZodIssueCode.custom,
      });
    }

    if (!current_password && new_password) {
      ctx.addIssue({
        path: ["current_password"],
        message: "Both current and new password are required if one is provided",
        code: z.ZodIssueCode.custom,
      });
    }
  });

export type UpdateUserValues = z.infer<typeof UpdateUserSchema>;
