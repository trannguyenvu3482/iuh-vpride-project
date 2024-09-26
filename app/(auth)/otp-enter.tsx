import CustomButton from "@/components/CustomButton";
import OAuth from "@/components/OAuth";
import PhoneInputField from "@/components/PhoneInputField";
import { images } from "@/constants";
import { getUserByPhone } from "@/utils/supabaseRequests";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import PhoneInput from "react-native-phone-number-input";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

const OTPEnter = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });
  const phoneInputRef = useRef<PhoneInput>(null);

  const handleVerify = async () => {
    const valid = phoneInputRef.current?.isValidNumber(
      phoneInputRef.current?.getNumberAfterPossiblyEliminatingZero().number,
    );

    console.log("valid", valid);

    if (valid) {
      try {
        const phone =
          phoneInputRef.current?.getNumberAfterPossiblyEliminatingZero()
            .formattedNumber;

        // Check user in db
        if (!phone) return;
        const user = await getUserByPhone(phone);

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

        // Toast.show({
        //   type: "info",
        //   text1: `Đã gửi mã OTP cho số điện thoại ${phone}`,
        //   text2: "",
        //   position: "bottom",
        // });

        router.navigate({
          pathname: "/(auth)/otp-check",
          params: {
            phone,
          },
        });
      } catch (error: any) {
        console.error("Error sending OTP:", error.message);
      }
    } else {
      Toast.show({
        type: "error",
        text1: "Số điện thoại không hợp lệ",
        position: "bottom",
      });
    }
  };

  return (
    <ScrollView className="flex-1 bg-white h-full">
      <SafeAreaView className="flex-1 bg-white">
        <View className="relative w-full max-h-[300px]">
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
          <CustomButton
            title="Xác thực"
            onPress={handleVerify}
            className="mt-6"
          />
          <OAuth />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default OTPEnter;
