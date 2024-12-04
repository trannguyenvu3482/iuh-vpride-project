import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { IMessage } from "react-native-gifted-chat";
import { MD3Colors } from "react-native-paper";

type ReplyMessageBarProps = {
  clearReply: () => void;
  message: IMessage | null;
};

const ReplyMessageBar = ({ clearReply, message }: ReplyMessageBarProps) => {
  return (
    <>
      {message !== null && (
        <View
          style={{
            height: 50,
            flexDirection: "row",
            backgroundColor: "#E4E9EB",
          }}
        >
          <View
            style={{ height: 50, width: 6, backgroundColor: "#89BC0C" }}
          ></View>
          <View style={{ flexDirection: "column" }}>
            <Text
              style={{
                color: "#89BC0C",
                paddingLeft: 10,
                paddingTop: 5,
                fontWeight: "600",
                fontSize: 15,
              }}
            >
              {message?.user.name}
            </Text>
            <Text style={{ color: "gray", paddingLeft: 10, paddingTop: 5 }}>
              {message!.text.length > 40
                ? message?.text.substring(0, 40) + "..."
                : message?.text}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "flex-end",
              paddingRight: 10,
            }}
          >
            <TouchableOpacity onPress={clearReply}>
              <Ionicons
                name="close-circle-outline"
                color={MD3Colors.primary50}
                size={28}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default ReplyMessageBar;
