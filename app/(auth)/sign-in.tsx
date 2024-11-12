import { CustomButton, OAuth, OTPInput } from "@/components";
import Loading from "@/components/Loading";
import { images } from "@/constants";
import { supabase } from "@/lib/supabase";
import { verifyOtp } from "@/utils/supabaseAuth";
import { useMutation } from "@tanstack/react-query";
import { Image } from "expo-image";
import { router, useGlobalSearchParams } from "expo-router";
import React, { useState } from "react";
import { AppState, ScrollView, Text, View } from "react-native";
import ReactNativeModal from "react-native-modal";
import Toast from "react-native-toast-message";

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});
const SignUp = () => {
  // Get params
  const { phone } = useGlobalSearchParams();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  console.log("Phone number", phone);

  const [otpInput, setOtpInput] = useState<string>("");
  const valid = otpInput.length === 6;

  const mutation = useMutation({
    mutationFn: (otp: string) => verifyOtp(phone as string, otp),
    onSuccess: (result) => {
      console.log("data", result);

      if (result.error) {
        const { code } = result.error;
        console.log("code", code);

        if (code === "otp_expired") {
          Toast.show({
            type: "error",
            text1: "Lỗi",
            text2: "Mã OTP không đúng hoặc đã hết hạn.",
          });
          // setTimeout(() => {
          //   router.navigate("/(root)/(tabs)/home");
          // }, 2000);
        } else {
          Toast.show({
            type: "error",
            text1: "Lỗi",
            text2: result.error.message,
          });
        }
      } else {
        Toast.show({
          type: "success",
          text1: "Thành công",
          text2: "Đang chuyển hướng...",
        });

        // navigate to sign up info after 3 sec
        setTimeout(() => {
          router.replace("/(root)/(tabs)/home");
        }, 3000);
      }
    },
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: "Lỗi",
        text2: "Đã xảy ra lỗi trong quá trình xác thực.",
      });
      console.error("Error during OTP verification:", error);
    },
  });

  const handleVerify = () => {
    if (!valid) {
      Toast.show({
        type: "error",
        text1: "Lỗi",
        text2: "Mã OTP phải có 6 ký tự.",
      });
      return;
    }

    mutation.mutate(otpInput);
  };

  return (
    <ScrollView className="flex-1 bg-white h-full">
      <View className="flex-1 bg-white">
        <View className="relative w-full max-h-[50vh]">
          <Image
            source={images.logoWithBG}
            className="z-0 w-full h-full"
            contentFit="cover"
          />
          <Text className="text-2xl text-black font-JakartaBold absolute bottom-0 left-5">
            Chào mừng bạn quay trở lại
          </Text>
        </View>
        <View className="p-5 flex-1 h-full">
          <Text className={`text-lg font-JakartaSemiBold mb-3`}>
            Hãy xác thực mã OTP đã được gửi đến số điện thoại:{" "}
            <Text className="font-JakartaBold text-primary-500">{phone}</Text>
          </Text>
          <OTPInput otpInput={otpInput} setOtpInput={setOtpInput} />
          {mutation.isPending ? (
            <Loading isLoading={true} />
          ) : (
            <CustomButton
              title="Xác thực"
              onPress={handleVerify}
              className="mt-6"
              disabled={!valid}
            />
          )}
          <OAuth />
        </View>
        <ReactNativeModal isVisible={showSuccessModal}>
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Image
              source={images.check}
              className="w-[110px] h-[110px] mx-auto my-5"
            />
            <Text className="text-3xl font-JakartaBold text-center">
              Chúc mừng!
            </Text>
            <Text className="text-base text-gray-400 font-JakartaMedium text-center mt-2">
              Bạn đã đăng nhập thành công, hãy bắt đầu thôi
            </Text>

            <CustomButton
              title="Bắt đầu"
              onPress={() => {
                router.navigate("/(root)/(tabs)/home");
              }}
              className="mt-5"
            />
          </View>
        </ReactNativeModal>
      </View>
      <Toast />
    </ScrollView>
  );
};

export default SignUp;
