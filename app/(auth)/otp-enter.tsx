import CustomButton from "@/components/CustomButton";
import Loading from "@/components/Loading";
import OAuth from "@/components/OAuth";
import PhoneInputField from "@/components/PhoneInputField";
import { images } from "@/constants";
import { signinWithPhone } from "@/utils/supabaseAuth";
import { getUserByPhone } from "@/utils/supabaseRequests";
import { useMutation } from "@tanstack/react-query";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useRef } from "react";
import { ScrollView, Text, View } from "react-native";
import PhoneInput from "react-native-phone-number-input";
import Toast from "react-native-toast-message";

const OTPEnter = () => {
  const phoneInputRef = useRef<PhoneInput>(null);
  const fetchUserMutation = useMutation({
    mutationFn: (phone: string) => getUserByPhone(phone),
  });

  const sendOtpMutation = useMutation({
    mutationFn: (phone: string) => signinWithPhone(phone),
  });

  const handleVerify = async () => {
    const valid = phoneInputRef.current?.isValidNumber(
      phoneInputRef.current?.getNumberAfterPossiblyEliminatingZero().number,
    );

    if (!valid) {
      Toast.show({
        type: "error",
        text1: "Số điện thoại không hợp lệ",
        position: "bottom",
      });
      return;
    }

    try {
      const phone =
        phoneInputRef.current?.getNumberAfterPossiblyEliminatingZero()
          .formattedNumber;

      // Check user in db
      if (!phone) return;
      const user = await fetchUserMutation.mutateAsync(phone);

      console.log("user", user);

      // Send OTP
      const { data } = await sendOtpMutation.mutateAsync(phone);

      if (user) {
        router.navigate({
          pathname: "/(auth)/sign-in",
          params: {
            phone,
          },
        });
      } else {
        router.navigate({
          pathname: "/(auth)/sign-up",
          params: {
            phone,
          },
        });
      }
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.message,
      });
      console.error("Error sending OTP:", error.message);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white h-full">
      <View className="flex-1 bg-white">
        <View className="relative w-full max-h-[400px]">
          <Image
            source={images.logoWithBG}
            className="z-0 w-full h-full"
            contentFit="cover"
          />
          <Text className="text-2xl text-black font-JakartaBold absolute bottom-0 left-5">
            Bắt đầu ngay với VPRide
          </Text>
        </View>
        <View className="p-5 flex-1 h-full">
          <Text className={`text-lg font-JakartaSemiBold mb-3`}>
            Để bắt đầu, hãy nhập số điện thoại của bạn
          </Text>
          {/* <InputField
            label="Để bắt đầu, nhập vào số điện thoại của bạn"
            placeholder="Nhập số điện thoại"
            icon={icons.vietnamFlag}
            value={form.name}
            onChange={(value) => setForm({ ...form, name: value })}
          /> */}
          <PhoneInputField phoneInputRef={phoneInputRef} />
          {fetchUserMutation.isPending || sendOtpMutation.isPending ? (
            <Loading />
          ) : (
            <CustomButton
              title="Tiếp tục"
              onPress={handleVerify}
              className="mt-5"
            />
          )}
          <OAuth />
        </View>
      </View>
    </ScrollView>
  );
};

export default OTPEnter;
