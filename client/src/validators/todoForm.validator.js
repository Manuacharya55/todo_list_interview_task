import { z } from "zod";

// ====================================== //
//         Simple Zod Schema for Todo Form Validation            //
// ====================================== //
export const todoFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(120, "Title cannot exceed 120 characters"),
  description: z
    .string()
    .trim()
    .max(500, "Description cannot exceed 500 characters")
    .optional()
    .default("")
});
