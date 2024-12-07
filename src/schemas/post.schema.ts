import { z } from "zod";

export const addCommentValidationSchema = z.object({
  content: z.string().trim().min(1, "Comment is required"),
});

export const createPostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  // content: z.string().min(1, "Content is required"),
  category: z.enum(["Tip", "Story"]),
  isPremium: z.string().optional().default("0"),
  // images: z.array(z.string().url("Invalid image URL")).optional(),
});

export const updatePostSchema = z.object({
  title: z.string().min(1, "Title is required").optional(),
  category: z.enum(["Tip", "Story"]).optional(),
  isPremium: z.string().optional().default("0"),
});
