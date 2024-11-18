import { Image } from "expo-image";
import { Stack } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Icon, MD3Colors } from "react-native-paper";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />

      <Stack.Screen
        name="[id]"
        options={{
          title: "",
          headerBackTitleVisible: false,
          headerRight: () => (
            <View className="flex-row gap-6">
              <TouchableOpacity>
                <Icon source="phone" color={MD3Colors.primary60} size={28} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon source="video" color={MD3Colors.primary60} size={28} />
              </TouchableOpacity>
            </View>
          ),
          headerTitle: ({ children }) => (
            <View className="flex-row gap-2 pb-1 items-center w-[220px]">
              <Image
                className="w-10 h-10 rounded-full border border-gray-300"
                source={{ uri: "https://robohash.org/a" }}
              />
              <View className="flex-row items-center">
                <Text className="text-base font-JakartaBold mr-1">
                  Trợ lý VPRide
                </Text>
                <Icon
                  source="check-circle"
                  color={MD3Colors.primary70}
                  size={16}
                />
              </View>
            </View>
          ),
        }}
      />
    </Stack>
  );
};

export default Layout;
