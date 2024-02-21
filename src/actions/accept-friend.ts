"use server";

import * as z from "zod";

import { db } from "@/lib/db";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { AcceptFriendSchema, AddFriendSchema } from "@/schemas/friend";
import { revalidatePath } from "next/cache";

export const acceptFriend = async (
  values: z.infer<typeof AcceptFriendSchema>,
) => {
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
    return { error: "Duplicate!" };
  }

  const friendRequest = await db.friendRequest.findFirst({
    where: {
      userRequesterId: friend.id,
      userTargetId: dbSelfUser.id,
      isAccept: false,
    },
  });

  if (!friendRequest) {
    return { error: "not found!" };
  }

  await db.friend.create({
    data: {
      requesterId: friendRequest.userRequesterId,
      accepterId: friendRequest.userTargetId,
    },
  });

  await db.friend.create({
    data: {
      requesterId: friendRequest.userTargetId,
      accepterId: friendRequest.userRequesterId,
    },
  });

  await db.friendRequest.update({
    where: {
      id: friendRequest.id,
    },
    data: {
      isAccept: true,
    },
  });

  revalidatePath(`/friends`);

  return { success: "successfully accept friend request" };
};
