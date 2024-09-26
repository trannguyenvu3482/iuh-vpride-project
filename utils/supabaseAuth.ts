import { supabase } from "@/lib/supabase"
import { AuthOtpResponse, AuthResponse } from "@supabase/supabase-js"

export const signinWithPhone = async (phone: string): Promise<AuthOtpResponse | Error> => {
    try {
        const { data, error }: AuthOtpResponse = await supabase.auth.signInWithOtp({
            phone
        })
        if (error) {
            throw error
        }
        return { data, error }
    } catch (error) {
        return error as Error;
    }
}

export const verifyOtp = async (phone: string, otp: string): Promise<AuthResponse | Error> => {
    try {
        const { data, error }: AuthResponse = await supabase.auth.verifyOtp({
            phone,
            token: otp,
            type: "sms"
        })
        if (error) {
            throw error
        }
        return { data, error }
    } catch (error) {
        return error as Error;
    }
}