import { create } from "zustand";

interface LocationStore {
  isSet: boolean; //TODO Naming
  onSet: () => void;
  onCancel: () => void;
}

export const useLocation = create<LocationStore>((set) => ({
  isSet: false,
  onSet: () => set(() => ({ isSet: true })),
  onCancel: () => set(() => ({ isSet: false })),
}));
