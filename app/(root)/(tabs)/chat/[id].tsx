import ReplyMessageBar from "@/components/ReplyMessageBar";
import messageData from "@/constants/messages.json";
import { supabase } from "@/lib/supabase";
import { useUserStore } from "@/zustand";
import "dayjs/locale/vi";
import { ImageBackground } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
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
  const { id: chatId } = useLocalSearchParams();

  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState("");
  const insets = useSafeAreaInsets();
  const { userData } = useUserStore();

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

  // Fetch initial messages

  // const onSend = useCallback((messages = []) => {
  //   console.log(">>> messages", messages);

  //   setMessages((previousMessages) =>
  //     GiftedChat.append(previousMessages, messages),
  //   );
  // }, []);

  // Listen for new messages

  useEffect(() => {
    // Fetch initial messages
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("id, content, created_at, user_id, users(full_name)")
        .eq("chat_id", userData?.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching messages:", error);
        return;
      }

      // Transform messages to GiftedChat format
      const formattedMessages = data.map((msg) => ({
        _id: msg.id,
        text: msg.content,
        createdAt: msg?.created_at ? new Date(msg.created_at) : new Date(),
        user: {
          _id: msg.user_id,
          name: msg?.users?.full_name,
        },
      }));

      setMessages(formattedMessages);
    };

    fetchMessages();

    // Subscribe to new messages
    const channel = supabase
      .channel("custom-insert-channel")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          const newMessage = {
            _id: payload.new.id,
            text: payload.new.content,
            createdAt: new Date(payload.new.created_at),
            user: {
              _id: payload.new.user_id,
              name: payload.new.users?.name || "Unknown",
              avatar: payload.new.users?.avatar_url || "",
            },
          };
          setMessages((prevMessages) =>
            GiftedChat.append(prevMessages, [newMessage]),
          );
        },
      )
      .subscribe();

    // Cleanup subscription on component unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, [userData?.id]);

  // Handle sending messages
  const onSend = useCallback(
    async (newMessages = []) => {
      const [message] = newMessages;
      const { text } = message;

      const { error } = await supabase.from("messages").insert({
        chat_id: Array.isArray(chatId) ? chatId[0] : chatId,
        user_id: userData?.id,
        content: text,
      });

      if (error) {
        console.error("Error sending message:", error);
      }
    },
    [chatId, userData?.id],
  );

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
