import { z } from "zod";

export const updateUserValidationSchema = z.object({
  name: z.string().max(100, "Name too long").optional(),
  bio: z.string().optional(),
});
