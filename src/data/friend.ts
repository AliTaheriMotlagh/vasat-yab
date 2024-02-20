import { db } from "@/lib/db";

export const getAllFriend = async (selfUserId: string) => {
  debugger;
  console.log("hi");
  try {
    const user = await db.friend.findMany({
      where: {
        isAccept: true,
        OR: [{ requesterId: selfUserId }, { accepterId: selfUserId }],
      },
    });

    return user;
  } catch {
    return null;
  }
};
