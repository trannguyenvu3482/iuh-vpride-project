import { icons } from "@/constants";
import { formatDate, formatTime } from "@/lib/utils";
import { Database } from "@/types/database";
import { Image } from "expo-image";
import React from "react";
import { Text, View } from "react-native";

const RideCard = ({
  ride: {
    destination_latitude,
    destination_longitude,
    start_address,
    destination_address,
    created_at,
    drivers: { full_name, vehicle_type },
    status,
    price,
    ride_time,
  },
}: {
  ride: Database["public"]["Tables"]["rides"]["Row"];
}) => {
  return (
    <View className="flex flex-row items-center justify-center bg-white rounded-lg shadow-sm shadow-neutral-300 mb-3">
      <View className="flex flex-col items-center justify-between p-3">
        <View className="flex flex-row items-center justify-between">
          <Image
            source={{
              uri: `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:${destination_longitude},${destination_latitude}&zoom=16&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY}`,
            }}
            className="w-[80px] h-[90px] rounded-lg"
          />
          <View className="flex flex-col mx-5 gap-y-5 flex-1">
            <View className="flex flex-row items-center gap-x-2">
              <Image source={icons.to} className="w-5 h-5" />
              <Text className="text-md font-JakartaMedium" numberOfLines={1}>
                {start_address}
              </Text>
            </View>
            <View className="flex flex-row items-center gap-x-2">
              <Image source={icons.point} className="w-5 h-5" />
              <Text className="text-md font-JakartaMedium" numberOfLines={1}>
                {destination_address}
              </Text>
            </View>
          </View>
        </View>
        <View className="flex flex-col w-full mt-5 bg-general-500 rounded-lg p-3 items-start justify-center">
          <View className="flex flex-row items-center w-full justify-between mb-5">
            <Text className="text-md font-JakartaMedium text-gray-500">
              Ngày và giờ
            </Text>
            <Text className="text-md font-JakartaMedium text-gray-500">
              {formatDate(created_at)}, {formatTime(ride_time / 60)}
            </Text>
          </View>
          <View className="flex flex-row items-center w-full justify-between mb-5">
            <Text className="text-md font-JakartaMedium text-gray-500">
              Tài xế
            </Text>
            <Text className="text-md font-JakartaMedium text-gray-500">
              {full_name}
            </Text>
          </View>
          <View className="flex flex-row items-center w-full justify-between mb-5">
            <Text className="text-md font-JakartaMedium text-gray-500">
              Loại xe
            </Text>
            <Text className="text-md font-JakartaMedium text-gray-500">
              {vehicle_type === "VPBIKE"
                ? "VPBike"
                : `VPCar ${vehicle_type === "VPCAR4" ? "4" : "7"} chỗ`}
            </Text>
          </View>
          <View className="flex flex-row items-center w-full justify-between mb-5">
            <Text className="text-md font-JakartaMedium text-gray-500">
              Tổng tiền
            </Text>
            <Text
              className={`text-md capitalize font-JakartaMedium  text-green-500`}
            >
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(price)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RideCard;
