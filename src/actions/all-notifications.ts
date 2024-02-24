"use server";

import { db } from "@/lib/db";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { room } from "./room";

export const allNotifications = async () => {
  const self = await currentUser();

  if (!self) {
    return { error: "Unauthorized" };
  }

  const dbSelfUser = await getUserById(self.id);

  if (!dbSelfUser) {
    return { error: "Unauthorized" };
  }

  const allNotifications = await db.roomInfo.findMany({
    where: {
      isAccept: false,
      userId: dbSelfUser.id,
    },
    include: {
      User: true,
      Room: { include: { User: true } },
    },
  });

  if (!allNotifications) {
    return { error: "not found!" };
  }

  return { success: true, data: allNotifications };
};
