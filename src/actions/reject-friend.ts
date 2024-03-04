"use server";

import * as z from "zod";

import { db } from "@/lib/db";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { RejectFriendSchema } from "@/schemas/friend";

export const rejectFriend = async (
  values: z.infer<typeof RejectFriendSchema>,
) => {
  const self = await currentUser();

  if (!self) {
    return { error: "Unauthorized" };
  }

  const dbSelfUser = await getUserById(self.id);

  if (!dbSelfUser) {
    return { error: "Unauthorized" };
  }

  const validatedFields = RejectFriendSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { friendId } = validatedFields.data;

  if (friendId === dbSelfUser.id) {
    return { error: "Invalid fields!" };
  }

  const friend = await db.user.findUnique({
    where: { id: friendId },
  });

  if (!friend) {
    return { error: "not found!" };
  }

  await db.friendRequest.deleteMany({
    where: {
      OR: [
        { userRequesterId: friend.id, userTargetId: dbSelfUser.id },
        { userRequesterId: dbSelfUser.id, userTargetId: friend.id },
      ],
      isAccept: false,
    },
  });

  return { success: "successfully reject friend request" };
};
