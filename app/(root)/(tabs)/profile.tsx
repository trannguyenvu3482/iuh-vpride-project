import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { CustomButton } from "@/components";
import InputField from "@/components/InputField";
import { supabase } from "@/lib/supabase";
import { useUserStore } from "@/zustand";
import { router } from "expo-router";
import { useState } from "react";
import { Icon } from "react-native-paper";

const Profile = () => {
  const { user, userData, resetUser } = useUserStore();
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState<any>({
    full_name: userData?.full_name,
    email: userData?.email,
    phone_number: userData?.phone_number,
  });

  const handleSignOut = () => {
    supabase.auth.signOut();
    resetUser();
    router.replace("/(auth)/otp-enter");
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <SafeAreaView className="flex-1 w-full">
      <ScrollView
        className="px-5 w-full flex-1"
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <View className="flex flex-row justify-between items-center">
          <Text className="text-2xl font-JakartaBold my-5">My profile</Text>
          <TouchableOpacity onPress={handleEdit}>
            <Icon
              source={isEditing ? "content-save" : "application-edit-outline"}
              color={isEditing ? "green" : "black"}
              size={24}
            />
          </TouchableOpacity>
        </View>

        <View className="flex items-center justify-center my-5">
          <Image
            source={{
              uri: "https://robohash.org/TU2.png",
            }}
            className=" rounded-full h-[110px] w-[110px] border-[3px] border-white shadow-sm shadow-neutral-300 bg-gray-300"
          />
        </View>

        <View className=" bg-white rounded-lg shadow-sm shadow-neutral-300 px-5 py-3 w-full flex-1">
          <InputField
            className="w-full"
            label="First name"
            placeholder={userData?.full_name || "Không tìm thấy"}
            containerStyle="w-full"
            inputStyle="p-3.5"
            editable={isEditing}
            value=""
            onChangeText={() => { }}
          />

          <InputField
            label="Email"
            placeholder={userData?.email || "Không tìm thấy"}
            containerStyle="w-full"
            inputStyle="p-3.5"
            editable={isEditing}
          />

          <InputField
            label="Phone"
            placeholder={userData?.phone_number || "Không tìm thấy"}
            containerStyle="w-full"
            inputStyle="p-3.5"
            editable={isEditing}
          />

          <CustomButton
            className="w-full mt-3"
            title="Đăng xuất"
            onPress={handleSignOut}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
