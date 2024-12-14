import { z } from "zod";

export const addReplyValidationSchema = z.object({
  content: z.string().min(1, "Reply is required"),
});
