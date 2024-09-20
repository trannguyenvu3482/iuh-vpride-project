import CustomButton from "@/components/CustomButton";
import OAuth from "@/components/OAuth";
import PhoneInputField from "@/components/PhoneInputField";
import { images } from "@/constants";
import { Image } from "expo-image";
import React, { useRef, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import PhoneInput from "react-native-phone-number-input";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

const OTPVerify = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });
  const phoneInputRef = useRef<PhoneInput>(null);
  const [valid, setValid] = useState(false);
  const [value, setValue] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const handleVerify = () => {
    const checkValid = phoneInputRef.current?.isValidNumber(value);
    setValid(checkValid ? checkValid : false);
    setIsVisible(true);
    console.log("valid", valid);
    Toast.show({
      type: `${valid ? "success" : "error"}`,
      text1: `${valid ? "Thành công" : "Thất bại"}`,
      position: "bottom",
    });
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
          <PhoneInputField
            phoneInputRef={phoneInputRef}
            value={value}
            onSetValue={setValue}
          />
          <CustomButton
            title="Xác thực"
            onPress={handleVerify}
            className="mt-6"
          />
          <OAuth />
        </View>
      </SafeAreaView>
      <Toast />
    </ScrollView>
  );
};

export default OTPVerify;
