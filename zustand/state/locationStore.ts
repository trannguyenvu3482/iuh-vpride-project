import { ILocationStore } from "@/types/type";
import { create } from "zustand";

export const useLocationStore = create<ILocationStore>((set) => ({
  userAddress: "",
  userLongitude: 0,
  userLatitude: 0,
  destinationAddress: "",
  destinationLongitude: 0,
  destinationLatitude: 0,
  setUserLocation: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    set(() => ({
      userAddress: address,
      userLongitude: longitude,
      userLatitude: latitude,
    }));
  },
  setDestinationLocation: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    set(() => ({
      destinationAddress: address,
      destinationLongitude: longitude,
      destinationLatitude: latitude,
    }));
  },
}));
