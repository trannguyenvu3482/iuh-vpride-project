import { supabase } from "@/lib/supabase";
import { Database } from "@/types/database";
import { IDriverStore, IMarkerData } from "@/types/type";
import { create } from "zustand";

export const useDriverStore = create<IDriverStore>((set) => ({
  drivers: [] as Database["public"]["Tables"]["drivers"]["Row"][],
  fetchDrivers: async () => {
    const { data } = await supabase.from("drivers").select("*");

    if (data) {
      set(() => ({
        drivers: data,
      }));
    } else {
      set(() => ({
        drivers: [],
      }));
    }
  },
  selectedDriver: null,
  setSelectedDriver: (driverId: string) => {
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
