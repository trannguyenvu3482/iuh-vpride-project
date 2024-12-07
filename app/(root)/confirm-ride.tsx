import { CustomButton } from "@/components";
import Loading from "@/components/Loading";
import RideLayout from "@/components/RideLayout";
import { icons } from "@/constants";
import { createChat } from "@/lib/chat";
import { supabase } from "@/lib/supabase";
import { formatTime } from "@/lib/utils";
import { useDriverStore, useUserStore } from "@/zustand";
import { useLocationStore } from "@/zustand/state/locationStore";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useState } from "react";
import { Text, View } from "react-native";

const ConfirmRide = () => {
  const {
    userAddress,
    destinationAddress,
    distance,
    duration,
    price,
    userLatitude,
    userLongitude,
    destinationLatitude,
    destinationLongitude,
  } = useLocationStore();
  const { drivers, selectedDriver, clearSelectedDriver } = useDriverStore();
  const [loading, setLoading] = useState(false);
  const { user, userData, setIsRiding } = useUserStore();
  const { resetLocation } = useLocationStore();

  const driverDetails = drivers?.filter(
    (driver) => driver.id === selectedDriver,
  )[0];

  const handleCompleteRide = async () => {
    setLoading(true);
    try {
      const ride = {
        start_address: userAddress,
        destination_address: destinationAddress,
        start_latitude: userLatitude,
        start_longitude: userLongitude,
        destination_latitude: destinationLatitude,
        destination_longitude: destinationLongitude,
        ride_time: duration,
        price: price,
        driver_id: selectedDriver,
        user_id: userData?.id,
        created_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from("rides")
        .insert([ride])
        .select();

      const chat = await createChat(userData?.id, selectedDriver);

      console.log(chat);

      if (data && data.length > 0) {
        clearSelectedDriver();
        resetLocation();
        setIsRiding(false);
        router.replace("/(root)/home");
      }

      if (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return loading ? (
    <Loading />
  ) : (
    <>
      <RideLayout title="Tìm xe" snapPoints={["10%", "70%"]}>
        <Text className="text-xl font-JakartaSemiBold mb-3">
          Thông tin chuyến đi
        </Text>

        <View className="bg-[#E6F3FF] flex justify-between items-center flex-row p-4">
          <View className="flex items-center justify-center">
            <Image
              source={{ uri: driverDetails?.profile_image_url }}
              className="w-20 h-20 rounded-full"
            />
            <Text className="font-JakartaBold text-base">
              {driverDetails?.full_name}
            </Text>
          </View>
          <View className="flex justify-center">
            <Text className="font-JakartaBold text-base">
              Thời lượng: {formatTime(Math.round(duration / 60))}
            </Text>
            <Text className="font-JakartaBold text-base">
              Quãng đường: {Math.round((distance / 1000) * 10) / 10} km
            </Text>
            <Text className="font-JakartaBold text-base">
              Giá:{" "}
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(price)}
            </Text>
          </View>
        </View>

        <View className="flex flex-col items-start justify-center mt-5">
          <View className="flex flex-row items-center justify-start mt-3 border-t border-b border-general-700 py-3">
            <Image source={icons.to} className="w-6 h-6" />
            <Text className="text-base font-JakartaBold ml-2 pr-4">
              {userAddress}
            </Text>
          </View>

          <View className="flex flex-row items-center justify-start border-b border-general-700 py-3">
            <Image source={icons.point} className="w-6 h-6" />
            <Text className="text-base font-JakartaBold ml-2 pr-4">
              {destinationAddress}
            </Text>
          </View>

          <CustomButton
            className="w-full mt-3 bg-red-500"
            title="Hoàn tất chuyến đi"
            onPress={() => handleCompleteRide()}
          />
          <CustomButton
            className="w-full mt-3"
            title="Trở về màn hình chính"
            onPress={() => {
              router.replace("/(root)/home");
            }}
          />
        </View>
      </RideLayout>
    </>
  );
};

export default ConfirmRide;
