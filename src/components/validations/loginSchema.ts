import { z } from 'zod';

export const loginSchema = z.object({
   email: z.string().min(1, { message: "Email address is required" })
      .email({ message: "Invalid email address" }),
   password: z.string().min(6, { message: "Password must be at least 8 chars" }),
})