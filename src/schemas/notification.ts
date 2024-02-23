import * as z from "zod";

export const CreateAcceptInvite = z.object({
  roomInfoId: z.string(),
  location: z.object({ longitude: z.number(), latitude: z.number() }),
});
