import CustomButton from "@/components/CustomButton";
import { onboarding } from "@/constants";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";
const Welcome = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastScreen = activeIndex === onboarding.length - 1;

  return (
    <SafeAreaView className="flex h-full items-center justify-between">
      <Pressable
        className="w-full flex justify-end items-end p-5"
        onPress={() => {
          router.replace("/(auth)/otp-verify");
        }}
      >
        <Text className="text-black text-md font-JakartaBold">Bỏ qua</Text>
      </Pressable>
      <Swiper
        ref={swiperRef}
        loop={false}
        dot={
          <View className="w-[32px] h-[4px] mx-1 bg-[#E2E8F0] rounded-full"></View>
        }
        activeDot={
          <View className="w-[32px] h-[4px] mx-1 bg-[#0286FF] rounded-full"></View>
        }
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        {onboarding.map((item) => (
          <View key={item.id} className="flex items-center justify-center p-5">
            <Image
              source={item.image}
              className="w-full h-[60%] object-contain"
              contentFit="contain"
            />
            <View className="flex flex-row items-center justify-center w-full mt-4">
              <Text
                className="text-black text-[28px]  font-JakartaBold mx-6 text-center"
                adjustsFontSizeToFit
                numberOfLines={2}
              >
                {item.title}
              </Text>
            </View>
            <View className="">
              <Text className="text-lg font-JakartaMedium text-center text-[#858585] mx-6 mt-2">
                {item.description}
              </Text>
            </View>
          </View>
        ))}
      </Swiper>
      <CustomButton
        onPress={() =>
          isLastScreen
            ? router.replace("/(auth)/otp-verify")
            : swiperRef.current?.scrollBy(1)
        }
        className="w-11/12 mb-8"
        title={isLastScreen ? "Bắt đầu ngay" : "Tiếp theo"}
      />
    </SafeAreaView>
  );
};

export default Welcome;
