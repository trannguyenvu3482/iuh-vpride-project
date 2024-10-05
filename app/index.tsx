import { supabase } from "@/lib/supabase";
import { useUserStore } from "@/zustand/state/userStore";
import { Redirect, router } from "expo-router";
import React, { useEffect } from "react";

const Home = () => {
  const { setUser } = useUserStore();

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        console.log("Index session", session);

        if (error) throw error;
        if (session) {
          setUser(session.user);
          router.navigate("/(root)/(tabs)/home");
        }
      } catch (error: any) {
        console.error("Error fetching session:", error.message);
      }
    };

    fetchSession();

    supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setUser(session.user);
        router.navigate("/(root)/(tabs)/home");
      }
    });
  }, [setUser]);

  return <Redirect href="/(auth)/welcome" />;
};

export default Home;
