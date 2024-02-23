import { User } from "@prisma/client";
import { create } from "zustand";

interface IInvitedFriends {
  invitedFriends: User[];
  setInvitedFriends: (newInvitedFriends: User[]) => void;
  resetInvitedFriends: () => void;
}

export const useInvitedFriends = create<IInvitedFriends>((set, get) => ({
  invitedFriends: [],
  setInvitedFriends: (newInvitedFriends: User[]) => {
    set({ invitedFriends: newInvitedFriends });
  },
  resetInvitedFriends: () => {
    set({ invitedFriends: [] });
  },
}));
