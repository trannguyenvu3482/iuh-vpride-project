import { supabase } from "@/lib/supabase";
import { IUserStore } from "@/types/type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useUserStore = create<IUserStore>()(
  persist(
    (set) => ({
      user: null,
      session: null,
      setUser: (user) => set({ user }),
      setSession: (session) => set({ session }),
      refreshSession: async () => {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (session) {
          set(() => ({ user: session.user }));
        } else {
          set(() => ({ user: null }));
        }
      },
    }),
    {
      name: "user-store",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
