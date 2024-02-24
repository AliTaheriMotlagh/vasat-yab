"use server";

import * as z from "zod";

import { db } from "@/lib/db";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { CreateAcceptInvite } from "@/schemas/notification";

export const acceptInvite = async (
  values: z.infer<typeof CreateAcceptInvite>,
) => {
  const self = await currentUser();

  if (!self) {
    return { error: "Unauthorized" };
  }

  const dbSelfUser = await getUserById(self.id);

  if (!dbSelfUser) {
    return { error: "Unauthorized" };
  }

  const validatedFields = CreateAcceptInvite.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { roomInfoId, location } = validatedFields.data;

  const roomInfo = await db.roomInfo.findUnique({
    where: {
      id: roomInfoId,
    },
  });

  if (!roomInfo) {
    return { error: "not found!" };
  }

  if (roomInfo.userId != dbSelfUser.id) {
    return { error: "Unauthorized" };
  }

  await db.roomInfo.update({
    where: {
      id: roomInfoId,
    },
    data: {
      isAccept: true,
      latitude: location.latitude,
      longitude: location.longitude,
    },
  });

  const otherFriends = await db.roomInfo.findMany({
    where: { roomId: roomInfo.roomId },
  });

  let acceptedUser = 0;
  let totalLongitude = 0;
  let totalLatitude = 0;

  for (let index = 0; index < otherFriends.length; index++) {
    const element = otherFriends[index];
    if (element.isAccept === true) {
      acceptedUser++;
      totalLongitude = totalLongitude + element.longitude;
      totalLatitude = totalLatitude + element.latitude;
    }
  }

  if (acceptedUser === otherFriends.length) {
    const vasatLongitude = totalLongitude / otherFriends.length;
    const vasatLatitude = totalLatitude / otherFriends.length;

    await db.room.update({
      where: {
        id: roomInfo.roomId,
      },
      data: {
        vasatlongitude: vasatLongitude,
        vasatlatitude: vasatLatitude,
        isFinished: true,
      },
    });
  }
  return { success: "successfully accept friend request" };
};
