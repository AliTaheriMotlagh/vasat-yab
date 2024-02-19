import create from "zustand";

interface ILngLat {
  longitude: number;
  latitude: number;
}

interface ICurrentLocation {
  coordinate: ILngLat; //TODO One Store have cordinate and state of isSet
  updateCoordinate: (newCoordinate: ILngLat) => void;
}

export const useCurrentLocation = create<ICurrentLocation>((set, get) => ({
  coordinate: { latitude: 0, longitude: 0 },
  updateCoordinate: (newCoordinate: ILngLat) => {
    const coordinateState = get().coordinate;

    set({ coordinate: newCoordinate });
  },
}));
