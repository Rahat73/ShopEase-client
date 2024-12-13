import { z } from "zod";

export const updateAdminValidationSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name too long"),
  phone: z.string().min(1, "Phone number is required"),
});
