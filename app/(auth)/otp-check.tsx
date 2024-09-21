import { CustomButton, OAuth, OTPInput } from "@/components";
import { images } from "@/constants";
import { Image } from "expo-image";
import { useGlobalSearchParams } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import Toast from "react-native-toast-message";

const OTPCheck = () => {
  // Get params
  const { phone } = useGlobalSearchParams();
  console.log("Phone number", phone);

  const [otpInput, setOtpInput] = useState<string>("");
  const valid = otpInput.length === 6;
  const handleVerify = async () => {
    console.log("OTP input", otpInput);

    console.log("valid", valid);

    Toast.show({
      type: `${valid ? "success" : "error"}`,
      text1: `${valid ? "Thành công" : "Thất bại"}`,
      text2: "",
      position: "bottom",
    });

    if (valid) {
      try {
        // Handle OTP verification
        // Handle check if current user is new or existing
        // If new user, navigate to register screen
        // If existing user, navigate to home screen
      } catch (error: any) {
        console.error("Error sending OTP:", error.message);
      }
    }
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
            Xác thực OTP
          </Text>
        </View>
        <View className="p-5 flex-1 h-full">
          <Text className={`text-lg font-JakartaSemiBold mb-3`}>
            Hãy xác thực mã OTP đã được gửi đến số điện thoại:{" "}
            <Text className="font-JakartaBold text-primary-500">{phone}</Text>
          </Text>
          <OTPInput otpInput={otpInput} setOtpInput={setOtpInput} />
          <CustomButton
            title="Xác thực"
            onPress={handleVerify}
            className="mt-6"
          />
          <OAuth />
        </View>
      </View>
      <Toast />
    </ScrollView>
  );
};

export default OTPCheck;
