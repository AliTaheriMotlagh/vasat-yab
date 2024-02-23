import { db } from "@/lib/db";

export const getRoomBySlug = async (slug: string) => {
  const room = await db.room.findFirst({
    where: {
      url: slug,
    },
  });
  return room;
};

export const getRoomInfos = async (roomId: string) => {
  const roomInfo = await db.roomInfo.findMany({
    where: {
      roomId: roomId,
      isAccept: true,
    },
    include: { User: true },
  });
  return roomInfo;
};
