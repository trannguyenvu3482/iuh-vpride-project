import { supabase } from "@/lib/supabase";
import { IUserStore } from "@/types/type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useUserStore = create<IUserStore>()(
  persist(
    (set) => ({
      user: null,
      userData: null,
      session: null,
      isRiding: false,
      setUser: (user) => set({ user }),
      setUserData: (userData) => set({ userData }),
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
      setIsRiding: (isRiding) => set({ isRiding }),
      resetUser: () => {
        set(() => ({
          user: null,
          userData: null,
          session: null,
          isRiding: false,
        }));
      },
    }),
    {
      name: "user-store",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
