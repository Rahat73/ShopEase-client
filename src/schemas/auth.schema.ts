import { z } from "zod";

export const registrationValidationSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name too long"),
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(100),
  profilePicture: z.string().optional(),
  bio: z.string().min(1, "Bio is required").max(100, "Bio too long"),
});

export const loginValidationSchema = z.object({
  email: z.string().trim().email("Please enter a valid email"),
  password: z
    .string()
    .trim()
    .min(6, "Password needs to be at lest 6 character"),
});

export const forgotPasswordValidationSchema = z.object({
  email: z.string().trim().email("Please enter a valid email"),
});

export const changePasswordValidationSchema = z.object({
  newPassword: z
    .string({
      required_error: "User password is required!",
    })
    .min(6, "Password must be at least 6 characters long"),
});
