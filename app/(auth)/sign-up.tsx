import { CustomButton, OAuth, OTPInput } from "@/components";
import { images } from "@/constants";
import { signinWithPhone } from "@/utils/supabaseAuth";
import { useSignUp } from "@clerk/clerk-expo";
import { Image } from "expo-image";
import { router, useGlobalSearchParams } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import ReactNativeModal from "react-native-modal";
import Toast from "react-native-toast-message";
const SignUp = () => {
  const { phone } = useGlobalSearchParams();
  const { isLoaded, signUp, setActive } = useSignUp();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  console.log("Phone number", phone);

  const [otpInput, setOtpInput] = useState<string>("");
  const valid = otpInput.length === 6;

  const handleVerify = async () => {
    try {
      const result = await signinWithPhone(phone as string);

      if (result instanceof Error) {
        throw result; 
      } else {
        console.log("data", result);
        setShowSuccessModal(true);
      }
    } catch (error) {
      console.log("error", error);
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
              title="Bắt đầu thôi"
              onPress={() => router.push(`/(root)/(tabs)/home`)}
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
