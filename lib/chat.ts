import { supabase } from "./supabase";

// Create a new chat
export async function createChat(userId: any, driverId: any) {
  const { data: chatData, error: chatError } = await supabase
    .from("chats")
    .select()
    .eq("user_id", userId)
    .eq("driver_id", driverId);

  if (chatData?.length !== 0) {
    console.log("Chat already exists", chatData);
    return null;
  }

  const { data: chatAdded, error: chatAddedError } = await supabase
    .from("chats")
    .insert([{ user_id: userId, driver_id: driverId }])
    .select();

  if (chatAddedError) {
    console.error("Error creating chat:", chatError);
    return null;
  }

  return chatAdded;
}

export async function fetchUserChats(userId: string) {
  const { data, error } = await supabase
    .from("chats")
    .select(
      `
      id,
      driver_id,
      user_id,
      created_at,
      drivers (full_name, profile_image_url)
    `,
    )
    .or(`user_id.eq.${userId},driver_id.eq.${userId}`); // Fetch chats where the user is either the user or driver

  if (error) {
    console.error("Error fetching chats:", error);
    return [];
  }

  return data;
}

export async function sendMessage(
  chatId: string,
  userId: string,
  content: string,
) {
  const { data, error } = await supabase
    .from("messages")
    .insert([{ chat_id: chatId, user_id: userId, content }])
    .select()
    .single();

  if (error) {
    console.error("Error sending message:", error);
    return null;
  }

  return {
    _id: data.id,
    text: data.content,
    createdAt: data.created_at ? new Date(data.created_at) : new Date(),
    user: {
      _id: data.user_id,
    },
  };
}

export async function fetchChatMessages(chatId: string) {
  const { data, error } = await supabase
    .from("messages")
    .select("id, content, created_at, user_id")
    .eq("chat_id", chatId)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching messages:", error);
    return [];
  }

  return data.map((msg) => ({
    _id: msg.id,
    text: msg.content,
    createdAt: new Date(msg.created_at || Date.now()),
    user: {
      _id: msg.user_id,
    },
  }));
}
