import { Room, RoomInfo, User } from "@prisma/client";
import { create } from "zustand";

type RoomInfoWithUser = RoomInfo & {
  User: User;
  Room: Room;
};

interface INotifications {
  notifications: RoomInfoWithUser[];
  setNotifications: (newFriendsRequest: RoomInfoWithUser[]) => void;
}

export const useNotifications = create<INotifications>((set, get) => ({
  notifications: [],
  setNotifications: (newNotifications: RoomInfoWithUser[]) => {
    set({ notifications: newNotifications });
  },
}));
