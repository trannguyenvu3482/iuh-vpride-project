import { InputField } from "@/components";
import { dummyChatContacts } from "@/constants";
import { truncateText } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { Icon, MD3Colors } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
const MAX_CHAT_MESSAGE_LENGTH = 30;

const Chat = () => {
  const [listContact, setListContact] = useState<any[]>(dummyChatContacts);
  const [searchContact, setSearchContact] = useState<string>("");

  return (
    <SafeAreaView className="py-5 bg-gray-200">
      <View className="px-5">
        <Text className="text-2xl font-JakartaExtraBold">
          Danh sách tin nhắn
        </Text>

        <InputField
          className="py-3"
          containerStyle="rounded-md"
          label=""
          placeholder="Tìm bạn bè"
          value={searchContact}
          onChangeText={setSearchContact}
        />
      </View>

      <FlatList
        className="mt-2 border-t border-t-gray-400"
        data={
          searchContact
            ? listContact.filter((item) =>
                item.name.toLowerCase().includes(searchContact.toLowerCase()),
              )
            : listContact
        }
        contentContainerStyle={{ paddingBottom: 200 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.navigate(`/chat/${item.id}`)}
            className={`${item.seen ? "bg-gray-200" : "bg-white"} px-3 py-3 flex-row items-center justify-between border-b border-b-gray-400`}
          >
            <View className="flex-row gap-2">
              <Image source={item.img} className="w-10 h-10 rounded-full" />
              <View>
                <View className="flex-row items-center">
                  <Text
                    className={`text-base font-JakartaBold ${item.seen && "text-gray-400"} mr-1`}
                  >
                    {item.name}
                  </Text>
                  {item.verified && (
                    <Icon
                      source="check-circle"
                      color={MD3Colors.primary70}
                      size={16}
                    />
                  )}
                </View>
                <Text
                  className={`text-xs font-JakartaMedium ${item.seen ? "text-gray-400" : "text-gray-500"}`}
                >
                  {truncateText(item.lastMessage, MAX_CHAT_MESSAGE_LENGTH)}
                </Text>
              </View>
            </View>
            <View className="flex-row items-center gap-2">
              <Text
                className={`text-xs font-JakartaBold ${item.seen && "text-gray-400"}`}
              >
                {formatDistanceToNow(new Date(item.date), {
                  addSuffix: true,
                  locale: vi,
                })}
              </Text>

              {!item.seen && (
                <View className="flex w-2.5 h-2.5 bg-cyan-500 rounded-full"></View>
              )}
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default Chat;
