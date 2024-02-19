import { create } from "zustand";

interface ILngLat {
  longitude: number;
  latitude: number;
}

interface ICurrentLocation {
  coordinate: ILngLat;
  isCoordinateSet: boolean;
  updateCoordinate: (newCoordinate: ILngLat) => void;
  removeCoordinate: () => void;
}

export const useCurrentLocation = create<ICurrentLocation>((set, get) => ({
  coordinate: { latitude: 0, longitude: 0 },
  isCoordinateSet: false,
  updateCoordinate: (newCoordinate: ILngLat) => {
    set({ coordinate: newCoordinate, isCoordinateSet: true });
  },
  removeCoordinate: () =>
    set(() => ({
      coordinate: { latitude: 0, longitude: 0 },
      isCoordinateSet: false,
    })),
}));
