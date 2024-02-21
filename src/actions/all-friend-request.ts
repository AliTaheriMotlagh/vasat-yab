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

  const allFriendRequest = await db.friendRequest.findMany({
    where: {
      isAccept: false,
      userTargetId: dbSelfUser.id,
    },
    include: {
      userRequester: true,
    },
  });

  if (!allFriendRequest) {
    return { error: "not found!" };
  }

  // TODO:make it on query
  let allFriendRequestUser: User[] = [];

  for (let index = 0; index < allFriendRequest.length; index++) {
    const element = allFriendRequest[index];
    allFriendRequestUser.push(element.userRequester);
  }

  return { success: true, data: allFriendRequestUser };
};
