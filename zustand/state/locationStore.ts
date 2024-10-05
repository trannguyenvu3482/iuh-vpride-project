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
    latitute,
    longitude,
    address,
  }: {
    latitute: number;
    longitude: number;
    address: string;
  }) => {
    set(() => ({
      userAddress: address,
      userLongitude: longitude,
      userLatitude: latitute,
    }));
  },
  setDestinationLocation: ({
    latitute,
    longitude,
    address,
  }: {
    latitute: number;
    longitude: number;
    address: string;
  }) => {
    set(() => ({
      destinationAddress: address,
      destinationLongitude: longitude,
      destinationLatitude: latitute,
    }));
  },
}));
