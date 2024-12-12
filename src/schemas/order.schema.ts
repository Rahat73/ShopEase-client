import { z } from "zod";

export const createOrderValidationSchema = z.object({
  phone: z.string().min(1, "Phone number is required"),
  address: z.string().min(1, "Address is required"),
});
