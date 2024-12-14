import { z } from "zod";

export const addProductValidationSchema = z.object({
  name: z.string().trim().min(1, "Product name is required"),
  description: z.string().trim().min(1, "Product description is required"),
  price: z.union([z.string().min(1, "Product price is required"), z.number()]),
  discount: z.union([z.string(), z.number()]).optional(),
  inventoryCount: z.union([
    z.string().min(1, "Product inventory count is required"),
    z.number(),
  ]),
  categoryId: z.string().min(1, "Product category is required"),
});
