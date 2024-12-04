import { supabase } from "@/lib/supabase";
import { AuthOtpResponse, AuthResponse } from "@supabase/supabase-js";

export const signinWithPhone = async (
  phone: string,
): Promise<AuthOtpResponse> => {
  const response: AuthOtpResponse = await supabase.auth.signInWithOtp({
    phone,
  });
  return response;
};

export const verifyOtp = async (
  phone: string,
  otp: string,
): Promise<AuthResponse> => {
  const response: AuthResponse = await supabase.auth.verifyOtp({
    phone,
    token: otp,
    type: "sms",
  });

  return response;
};
