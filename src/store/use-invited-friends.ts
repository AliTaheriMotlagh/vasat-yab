import { create } from "zustand";

interface IInvitedFriends {
  invitedFriends: string[];
  setInvitedFriends: (newInvitedFriends: string[]) => void;
  reset: () => void;
}

export const useInvitedFriends = create<IInvitedFriends>((set, get) => ({
  invitedFriends: [],
  setInvitedFriends: (newInvitedFriends: string[]) => {
    set({ invitedFriends: newInvitedFriends });
  },
  reset: () => {
    set({ invitedFriends: [] });
  },
}));
