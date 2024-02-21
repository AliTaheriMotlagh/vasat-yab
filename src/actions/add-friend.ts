"use server";

import * as z from "zod";

import { db } from "@/lib/db";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { AddFriendSchema } from "@/schemas/friend";

export const addFriend = async (values: z.infer<typeof AddFriendSchema>) => {
  const self = await currentUser();

  if (!self) {
    return { error: "Unauthorized" };
  }

  const dbSelfUser = await getUserById(self.id);

  if (!dbSelfUser) {
    return { error: "Unauthorized" };
  }

  const validatedFields = AddFriendSchema.safeParse(values);

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

  if (friendship) {
    return { error: "already requested!" };
  }

  await db.friendRequest.create({
    data: {
      userRequesterId: dbSelfUser.id,
      userTargetId: friend.id,
      isAccept: false,
    },
  });

  return { success: "request is send" };
};
