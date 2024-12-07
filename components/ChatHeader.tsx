import { supabase } from "@/lib/supabase";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Icon, MD3Colors } from "react-native-paper";

const ChatHeader = ({ id, name }: { id?: string; name?: string }) => {
  const [driverName, setDriverName] = React.useState<any>(null);
  const [driverImage, setDriverImage] = React.useState<any>(null);

  useEffect(() => {
    const fetchDriver = async () => {
      console.log(id);

      const { data, error } = await supabase
        .from("chats")
        .select("drivers (full_name, profile_image_url)")
        .eq("id", id);

      console.log(data);

      if (data) {
        setDriverName(data[0]?.drivers?.full_name);
        setDriverImage(data[0]?.drivers?.profile_image_url);
      }

      if (error) {
        console.log(error);
      }
    };

    if (id) {
      fetchDriver();
    }
  }, [id]);

  return (
    <View className="flex-row gap-2 pb-1 items-center w-full bg-white justify-between">
      <View className="flex-row items-center">
        <TouchableOpacity onPress={() => router.back()}>
          <Icon source="chevron-left" color="black" size={34} />
        </TouchableOpacity>
        <Image
          className="w-10 h-10 rounded-full border border-gray-300"
          source={
            name
              ? { uri: "https://robohash.org/YWL.png?set=set1" }
              : driverImage
          }
        />
        <Text className="text-base font-JakartaBold mx-1">
          {name || driverName}
        </Text>
        <Icon source="check-circle" color={MD3Colors.primary70} size={16} />
      </View>

      <View className="flex-row items-start flex justify-center pr-4">
        <TouchableOpacity className="mr-4">
          <Icon source="phone" color={MD3Colors.primary60} size={28} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon source="video" color={MD3Colors.primary60} size={28} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatHeader;
