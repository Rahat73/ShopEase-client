import { z } from "zod";

export const updateAdminValidationSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name too long"),
  phone: z.string().min(1, "Phone number is required"),
});

export const updateVendorValidationSchema = z.object({
  shopName: z.string().min(1, "Name is required").max(100, "Name too long"),
  shopDescription: z.string().min(1, "Name is required"),
  phone: z.string().min(1, "Phone number is required"),
  address: z.string().min(1, "Address is required"),
});

export const updateCustomerValidationSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name too long"),
  phone: z.string().optional(),
  address: z.string().optional(),
});
