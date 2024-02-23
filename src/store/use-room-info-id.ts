import { create } from "zustand";

interface IRoomInfoId {
  roomInfoId: string;
  setRoomInfoId: (newItem: string) => void;
  resetRoomInfoId: () => void;
}

export const useRoomInfoId = create<IRoomInfoId>((set, get) => ({
  roomInfoId: "",
  setRoomInfoId: (newItem: string) => {
    set({ roomInfoId: newItem });
  },
  resetRoomInfoId: () => {
    set({ roomInfoId: "" });
  },
}));
