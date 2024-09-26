import { supabase } from "@/lib/supabase";

export const getUserById = async (userId: string) => {
  const { data: user } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();
  return user;
};

export const getUserByPhone = async (phone: string) => {
  const { data: user } = await supabase
    .from("users")
    .select("*")
    .eq("phone_number", phone)
    .single();
  return user;
};
