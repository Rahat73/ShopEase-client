import { z } from "zod";

export const addProductValidationSchema = z.object({
  name: z.string().trim().min(1, "Product name is required"),
  description: z.string().trim().min(1, "Product description is required"),
  price: z.string().min(1, "Product price is required"),
  discount: z.string().optional(),
  inventoryCount: z.string().min(1, "Product inventory count is required"),
  categoryId: z.string().min(1, "Product category is required"),
});
