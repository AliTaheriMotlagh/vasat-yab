"use server";

import { db } from "@/lib/db";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { User } from "@prisma/client";

export const allFriendRequest = async () => {
  const self = await currentUser();

  if (!self) {
    return { error: "Unauthorized" };
  }

  const dbSelfUser = await getUserById(self.id);

  if (!dbSelfUser) {
    return { error: "Unauthorized" };
  }

  const allFriendRequest = await db.friend.findMany({
    where: {
      isAccept: false,
      accepterId: dbSelfUser.id,
    },
    include: {
      requester: true,
    },
  });

  if (!allFriendRequest) {
    return { error: "not found!" };
  }

  // TODO:make it on query
  let allFriendRequestUser: User[] = [];

  for (let index = 0; index < allFriendRequest.length; index++) {
    const element = allFriendRequest[index];
    allFriendRequestUser.push(element.requester);
  }

  return { success: true, data: allFriendRequestUser };
};
