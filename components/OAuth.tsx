import { icons } from "@/constants";
import { Image } from "expo-image";
import React from "react";
import { Text, View } from "react-native";
import CustomButton from "./CustomButton";

const OAuth = () => {
  const handleGoogleOAuth = async () => {};
  return (
    <View>
      <View className="flex flex-row justify-center items-center mt-4 gap-x-3">
        <View className="flex-1 h-[1px] bg-general-100" />
        <Text className="text-lg">Hoặc</Text>
        <View className="flex-1 h-[1px] bg-general-100" />
      </View>
      <CustomButton
        bgVariant="outline"
        textVariant="primary"
        title="Tiếp tục với Google"
        className="mt-5 w-full shadow-none"
        IconLeft={() => (
          <Image
            source={icons.googleLogo}
            contentFit="contain"
            className="w-5 h-5 mx-2"
          />
        )}
        onPress={handleGoogleOAuth}
      />
    </View>
  );
};

export default OAuth;
