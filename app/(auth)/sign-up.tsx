import { CustomButton, OAuth, OTPInput } from "@/components";
import { images } from "@/constants";
import { verifyOtp } from "@/utils/supabaseAuth";
import { useMutation } from "@tanstack/react-query";
import { Image } from "expo-image";
import { router, useGlobalSearchParams } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import Toast from "react-native-toast-message";

const SignUp = () => {
  const { phone } = useGlobalSearchParams();
  console.log("Phone number", phone);

  const [otpInput, setOtpInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const valid = otpInput.length === 6;

  const mutation = useMutation({
    mutationFn: (otp: string) => verifyOtp(phone as string, otp),
    onSuccess: (result) => {
      console.log("data", result);

      if (result.error) {
        Toast.show({
          type: "error",
          text1: "Lỗi",
          text2: result.error.message,
        });
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

  // const handleVerify = async () => {
  //   if (!valid) {
  //     Toast.show({
  //       type: "error",
  //       text1: "Lỗi",
  //       text2: "Mã OTP phải có 6 ký tự.",
  //     });
  //     return;
  //   }

  //   setLoading(true);

  //   try {
  //     const result = await verifyOtp(phone as string, otpInput);

  //     console.log("data", result);

  //     if (result.error) {
  //       Toast.show({
  //         type: "error",
  //         text1: "Lỗi",
  //         text2: result.error.message,
  //       });
  //     } else {
  //       Toast.show({
  //         type: "success",
  //         text1: "Thành công",
  //         text2: "Đang chuyển hướng...",
  //       });

  //       // navigate to sign up info after 3 sec
  //       setTimeout(() => {
  //         router.navigate("/(root)/(tabs)/home");
  //       }, 3000);
  //     }
  //   } catch (error) {
  //     Toast.show({
  //       type: "error",
  //       text1: "Lỗi",
  //       text2: "Đã xảy ra lỗi trong quá trình xác thực.",
  //     });
  //     console.error("Error during OTP verification:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

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
            Chào mừng bạn đến với VPRide
          </Text>
        </View>
        <View className="p-5 flex-1 h-full">
          <Text className={`text-lg font-JakartaSemiBold mb-3`}>
            Hãy xác thực mã OTP đã được gửi đến số điện thoại:{" "}
            <Text className="font-JakartaBold text-primary-500">{phone}</Text>
          </Text>
          <OTPInput otpInput={otpInput} setOtpInput={setOtpInput} />
          {mutation.isPending ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <CustomButton
              title="Xác thực"
              onPress={handleVerify}
              className="mt-6"
            />
          )}
          <OAuth />
        </View>
      </View>
      <Toast />
    </ScrollView>
  );
};

export default SignUp;
