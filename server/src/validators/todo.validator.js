import { z } from "zod";

export const todoSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .trim()
    .min(1, "Title cannot be empty")
    .max(120, "Title cannot exceed 120 characters"),
  description: z
    .string()
    .trim()
    .max(500, "Description cannot exceed 500 characters")
    .optional()
    .default(""),
  completed: z
    .boolean()
    .optional()
    .default(false)
});
