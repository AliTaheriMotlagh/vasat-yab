"use server";

import * as z from "zod";

import { db } from "@/lib/db";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { DeleteFriendSchema } from "@/schemas/friend";

export const deleteFriend = async (
  values: z.infer<typeof DeleteFriendSchema>,
) => {
  const self = await currentUser();

  if (!self) {
    return { error: "Unauthorized" };
  }

  const dbSelfUser = await getUserById(self.id);

  if (!dbSelfUser) {
    return { error: "Unauthorized" };
  }

  const validatedFields = DeleteFriendSchema.safeParse(values);

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

  const friendship = await db.friend.findFirst({
    where: {
      requesterId: dbSelfUser.id,
      accepterId: friend.id,
    },
  });

  if (!friendship) {
    return { error: "not found!" };
  }

  await db.friendRequest.deleteMany({
    where: {
      OR: [
        {
          userTargetId: friendship.requesterId,
          userRequesterId: friendship.accepterId,
        },
        {
          userTargetId: friendship.accepterId,
          userRequesterId: friendship.requesterId,
        },
      ],
    },
  });

  await db.friend.deleteMany({
    where: {
      OR: [
        {
          accepterId: friendship.accepterId,
          requesterId: friendship.requesterId,
        },
        {
          accepterId: friendship.requesterId,
          requesterId: friendship.accepterId,
        },
      ],
    },
  });

  return { success: "user delete from friends" };
};
