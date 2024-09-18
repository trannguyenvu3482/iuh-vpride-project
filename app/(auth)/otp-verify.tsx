import InputField from "@/components/InputField";
import PhoneInputField from "@/components/PhoneInputField";
import { icons, images } from "@/constants";
import React, { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const OTPVerify = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  return (
    <ScrollView className="flex-1 bg-white">
      <SafeAreaView className="flex-1 bg-white">
        <View className="relative w-full h-[350px]">
          <Image source={images.logoWithBG} className="z-0 w-full h-[350px]" />
          <Text className="text-2xl text-black font-JakartaBold absolute bottom-0 left-5">
            Bắt đầu ngay với VPRide
          </Text>
        </View>
        <View className="p-5">
          <Text className={`text-lg font-JakartaSemiBold mb-3`}>
            Để bắt đầu, hãy nhập số điện thoại của bạn
          </Text>
          <InputField
            label="Để bắt đầu, nhập vào số điện thoại của bạn"
            placeholder="Nhập số điện thoại"
            icon={icons.vietnamFlag}
            value={form.name}
            onChange={(value) => setForm({ ...form, name: value })}
          />
          <PhoneInputField />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default OTPVerify;
