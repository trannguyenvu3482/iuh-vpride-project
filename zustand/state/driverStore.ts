import { IDriverStore, IMarkerData } from "@/types/type";
import { create } from "zustand";

export const useDriverStore = create<IDriverStore>((set) => ({
  drivers: [] as IMarkerData[],
  selectedDriver: null,
  setSelectedDriver: (driverId: number) => {
    set(() => ({
      selectedDriver: driverId,
    }));
  },
  setDrivers: (drivers: IMarkerData[]) => {
    set(() => ({
      drivers,
    }));
  },
  clearSelectedDriver: () => {
    set(() => ({
      selectedDriver: null,
    }));
  },
}));
