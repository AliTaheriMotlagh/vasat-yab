import { User } from "@prisma/client";
import { create } from "zustand";

interface IMyFriends {
  friends: User[];
  setFriends: (newFriends: User[]) => void;
}

export const useMyFriends = create<IMyFriends>((set, get) => ({
  friends: [],
  setFriends: (newFriends: User[]) => {
    set({ friends: newFriends });
  },
}));
