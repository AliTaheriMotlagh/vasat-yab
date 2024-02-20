"use server";

import * as z from "zod";

import { db } from "@/lib/db";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { CreateRoomSchema } from "@/schemas/room";

export const room = async (values: z.infer<typeof CreateRoomSchema>) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return { error: "Unauthorized" };
  }

  const validatedFields = CreateRoomSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { title, creatorLocation } = validatedFields.data;

  const createRoom = await db.room.create({
    data: {
      title,
      creatorId: dbUser.id,
      vasatlatitude: 0,
      vasatlongitude: 0,
    },
  });

  const createRoomInfo = await db.roomInfo.create({
    data: {
      roomId: createRoom.id,
      userId: dbUser.id,
      longitude: creatorLocation.longitude,
      latitude: creatorLocation.latitude,
      isAccept: true,
    },
  });

  return { success: "Room Created!" };
};
