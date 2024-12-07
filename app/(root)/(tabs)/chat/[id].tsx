import ChatHeader from "@/components/ChatHeader";
import Loading from "@/components/Loading";
import ReplyMessageBar from "@/components/ReplyMessageBar";
import { fetchChatMessages, sendMessage } from "@/lib/chat";
import { useUserStore } from "@/zustand";
import "dayjs/locale/vi";
import { ImageBackground } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import {
  Bubble,
  GiftedChat,
  InputToolbar,
  Send,
  SystemMessage,
} from "react-native-gifted-chat";
import { Icon, MD3Colors } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ChatDetail = () => {
  const { id: chatId }: { id: string } = useLocalSearchParams();

  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState("");
  const insets = useSafeAreaInsets();
  const { userData } = useUserStore();

  const [replyMessage, setReplyMessage] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Fetch messages when the component mounts
  useEffect(() => {
    const loadMessages = async () => {
      setLoading(true);
      const fetchedMessages = await fetchChatMessages(chatId);
      setMessages(fetchedMessages);
      setLoading(false);
    };

    loadMessages();
  }, [chatId]);

  // Handle sending a message
  const handleSend = async (newMessages: any[] = []) => {
    setLoading(true);
    const [message] = newMessages; // GiftedChat sends an array of new messages

    const sentMessage = await sendMessage(chatId, userData?.id, message?.text);

    if (sentMessage) {
      setMessages((prevMessages) =>
        GiftedChat.append(prevMessages, [sentMessage]),
      );
    }
    setLoading(false);
  };

  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1563291074-2bf8677ac0e5?q=80&w=1907&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      }}
      style={{
        flex: 1,
        marginBottom: insets.bottom,
      }}
    >
      <ChatHeader id={chatId} />
      {loading ? (
        <Loading />
      ) : (
        <GiftedChat
          messages={messages}
          onSend={(newMessages) => handleSend(newMessages)}
          onInputTextChanged={setText}
          user={{
            _id: userData?.id,
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
          showUserAvatar={false}
          maxComposerHeight={100}
          maxInputLength={100}
          textInputProps={styles.composer}
          renderAvatar={null}
          renderBubble={(props) => {
            return (
              <Bubble
                {...props}
                textStyle={{
                  right: {
                    color: "#fff",
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
      )}
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
