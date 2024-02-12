import { z } from "zod";

export const formSchema = z.object({
  email: z
    .string({
      invalid_type_error: "🚨 Please enter a valid email",
      required_error: "🚨 Please enter an email",
    })
    .email({
      message: "📧 Please enter a valid email",
    })
    .min(2)
    .max(20),
});
