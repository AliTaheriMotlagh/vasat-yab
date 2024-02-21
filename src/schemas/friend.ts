import * as z from "zod";

export const SearchUserSchema = z.object({
  email: z.string().toLowerCase().email({
    message: "Email is required",
  }),
});

export const AddFriendSchema = z.object({
  friendId: z.string(),
});

export const AcceptFriendSchema = z.object({
  friendId: z.string(),
});
