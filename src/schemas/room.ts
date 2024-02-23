import * as z from "zod";

export const CreateRoomSchema = z.object({
  title: z.string(),
  creatorLocation: z.object({ longitude: z.number(), latitude: z.number() }),
  invitedFriends: z.array(z.string()),
});

export const CreateRoomInfoSchema = z.object({
  title: z.string(),
});
