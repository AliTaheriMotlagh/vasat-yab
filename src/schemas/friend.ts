import * as z from "zod";

export const SearchUserSchema = z.object({
  email: z.string().toLowerCase().email({
    message: "Email is required",
  }),
});
