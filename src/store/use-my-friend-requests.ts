import { User } from "@prisma/client";
import { create } from "zustand";

interface IMyFriendRequests {
  friendRequests: User[];
  setFriendRequests: (newFriendsRequest: User[]) => void;
}

export const useMyFriendsRequests = create<IMyFriendRequests>((set, get) => ({
  friendRequests: [],
  setFriendRequests: (newFriendsRequest: User[]) => {
    set({ friendRequests: newFriendsRequest });
  },
}));
