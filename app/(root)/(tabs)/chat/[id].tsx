import ReplyMessageBar from "@/components/ReplyMessageBar";
import { dummyChatContacts } from "@/constants";
import messageData from "@/constants/messages.json";
import "dayjs/locale/vi";
import { ImageBackground } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import {
  Avatar,
  Bubble,
  GiftedChat,
  InputToolbar,
  Send,
  SystemMessage,
} from "react-native-gifted-chat";
import { Icon, MD3Colors } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ChatDetail = () => {
  const { id } = useLocalSearchParams();

  const user = dummyChatContacts.find((item) => item.id === id);

  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState("");
  const insets = useSafeAreaInsets();

  const [replyMessage, setReplyMessage] = useState<any>(null);

  useEffect(() => {
    setMessages([
      ...messageData.map((message) => {
        return {
          _id: message.id,
          text: message.msg,
          createdAt: new Date(message.date),
          user: {
            _id: message.from,
            name: message.from ? "You" : "Bob",
            avatar: "https://robohash.org/a",
          },
        };
      }),
      {
        _id: 0,
        system: true,
        text: "Bạn đã lướt hết tin nhắn rồi.",
        createdAt: new Date(),
        user: {
          _id: 0,
          name: "Bot",
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1541256181278-02c7e14f2a8e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      }}
      style={{
        flex: 1,
        marginBottom: insets.bottom,
      }}
    >
      <GiftedChat
        messages={messages}
        onSend={(messages: any) => onSend(messages)}
        onInputTextChanged={setText}
        user={{
          _id: 1,
        }}
        renderSystemMessage={(props) => (
          <SystemMessage
            {...props}
            textStyle={{ color: "#333", fontSize: 14 }}
          />
        )}
        placeholder="Nhập tin nhắn..."
        locale={"vi"}
        infiniteScroll={true}
        loadEarlier={true}
        scrollToBottom={true}
        onPress={(context: any, message: any) => {
          console.log(message);
          context.actionSheet();
        }}
        scrollToBottomComponent={() => (
          <View
            style={{
              height: 44,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon source="chevron-down" color="#000" size={28} />
          </View>
        )}
        bottomOffset={insets.bottom}
        showUserAvatar={true}
        maxComposerHeight={100}
        maxInputLength={100}
        textInputProps={styles.composer}
        renderAvatar={(props) => {
          return (
            <Avatar
              {...props}
              imageStyle={{
                left: {
                  backgroundColor: "#fff",
                },
                right: {
                  backgroundColor: "#444AFD",
                },
              }}
            />
          );
        }}
        renderBubble={(props) => {
          return (
            <Bubble
              {...props}
              textStyle={{
                right: {
                  color: "#000",
                  fontSize: 14,
                  fontFamily: "Jakarta-SemiBold",
                },
                left: {
                  color: "#000",
                  fontSize: 14,
                  fontFamily: "Jakarta-SemiBold",
                },
              }}
              wrapperStyle={{
                left: {
                  backgroundColor: "#fff",
                },
                right: {
                  backgroundColor: "#444AFD",
                },
              }}
            />
          );
        }}
        renderSend={(props) => (
          <View
            style={{
              height: 44,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 14,
              paddingHorizontal: 14,
            }}
          >
            {text === "" && (
              <>
                <Icon
                  source="camera-outline"
                  color={MD3Colors.primary60}
                  size={28}
                />
                <Icon
                  source="microphone"
                  color={MD3Colors.primary60}
                  size={28}
                />
              </>
            )}
            {text !== "" && (
              <Send
                {...props}
                containerStyle={{
                  justifyContent: "center",
                }}
              >
                <Icon source="send" color={MD3Colors.primary60} size={28} />
              </Send>
            )}
          </View>
        )}
        renderInputToolbar={renderInputToolbar}
        renderChatFooter={() => (
          <ReplyMessageBar
            clearReply={() => setReplyMessage(null)}
            message={replyMessage}
          />
        )}
        onLongPress={(context, message) => setReplyMessage(message)}
        // renderMessage={(props) => (
        //   <ChatMessageBox
        //     {...props}
        //     setReplyOnSwipeOpen={setReplyMessage}
        //     updateRowRef={updateRowRef}
        //   />
        // )}
      />
    </ImageBackground>
  );
};

const renderInputToolbar = (props: any) => {
  return (
    <InputToolbar
      {...props}
      containerStyle={{ backgroundColor: "#eee", paddingVertical: 4 }}
      renderActions={() => (
        <View
          style={{
            height: 44,
            justifyContent: "center",
            alignItems: "center",
            left: 5,
          }}
        >
          <TouchableOpacity>
            <Icon source="plus" color={MD3Colors.primary50} size={28} />
          </TouchableOpacity>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  composer: {
    backgroundColor: "#fff",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    paddingVertical: 4,
    fontSize: 16,
    marginVertical: 4,
  },
});

export default ChatDetail;
