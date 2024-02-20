"use server";

import { db } from "@/lib/db";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { User } from "@prisma/client";

export const allFriend = async () => {
  const self = await currentUser();

  if (!self) {
    return { error: "Unauthorized" };
  }

  const dbSelfUser = await getUserById(self.id);

  if (!dbSelfUser) {
    return { error: "Unauthorized" };
  }

  const allFriend = await db.friend.findMany({
    where: {
      isAccept: true,
      accepterId: dbSelfUser.id,
    },
    include: {
      requester: true,
    },
  });

  if (!allFriend) {
    return { error: "not found!" };
  }

  // TODO:make it on query
  let allFriendUser: User[] = [];

  for (let index = 0; index < allFriend.length; index++) {
    const element = allFriend[index];
    allFriendUser.push(element.requester);
  }

  return { success: true, data: allFriendUser };
};
