import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import InputField from "@/components/InputField";
import { useUserStore } from "@/zustand";

const Profile = () => {
  const { user, userData } = useUserStore();

  return (
    <SafeAreaView className="flex-1 w-full">
      <ScrollView
        className="px-5 w-full flex-1"
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <Text className="text-2xl font-JakartaBold my-5">My profile</Text>

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
            placeholder={userData?.full_name || "Not Found"}
            containerStyle="w-full"
            inputStyle="p-3.5"
            editable={false}
          />

          <InputField
            label="Email"
            placeholder={userData?.email || "Not Found"}
            containerStyle="w-full"
            inputStyle="p-3.5"
            editable={false}
          />

          <InputField
            label="Phone"
            placeholder={userData?.phone_number || "Not Found"}
            containerStyle="w-full"
            inputStyle="p-3.5"
            editable={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
