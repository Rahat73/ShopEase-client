import { z } from "zod";

export const customerSignupValidationSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name too long"),
  email: z.string().trim().email("Please enter a valid email"),
  phone: z.string().optional(),
  address: z.string().optional(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const vendorSignupValidationSchema = z.object({
  email: z.string().trim().email("Please enter a valid email"),
  phone: z.string({
    required_error: "Contact Number is required!",
  }),
  shopName: z.string({
    required_error: "Name is required!",
  }),
  shopDescription: z.string({
    required_error: "Description is required!",
  }),
  address: z.string({
    required_error: "Address is required!",
  }),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const adminSignupValidationSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name too long"),
  email: z.string().trim().email("Please enter a valid email"),
  phone: z.string({
    required_error: "Contact Number is required!",
  }),
  password: z.string().min(6, "Password must be at least 6 characters long"),
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

export const resetPasswordValidationSchema = z.object({
  password: z
    .string({
      required_error: "User password is required!",
    })
    .min(6, "Password must be at least 6 characters long"),
});

export const changePasswordValidationSchema = z.object({
  newPassword: z
    .string({
      required_error: "User password is required!",
    })
    .min(6, "Password must be at least 6 characters long"),
});
