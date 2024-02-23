import { create } from "zustand";

interface IInvitedFriends {
  invitedFriends: string[];
  setInvitedFriends: (newInvitedFriends: string[]) => void;
  resetInvitedFriends: () => void;
}

export const useInvitedFriends = create<IInvitedFriends>((set, get) => ({
  invitedFriends: [],
  setInvitedFriends: (newInvitedFriends: string[]) => {
    set({ invitedFriends: newInvitedFriends });
  },
  resetInvitedFriends: () => {
    set({ invitedFriends: [] });
  },
}));
