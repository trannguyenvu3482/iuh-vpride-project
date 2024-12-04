import { supabase } from "./supabase";

// Create a new chat
export async function createChat(
  participants: any[],
  name = null,
  isGroup = false,
) {
  const { data: chat, error: chatError } = await supabase
    .from("chats")
    .insert([{ name, is_group: isGroup }])
    .select();

  if (chatError) {
    console.error("Error creating chat:", chatError);
    return null;
  }

  // Add participants to the chat
  const chatId = chat[0].id;
  const participantRows = participants.map((userId) => ({
    chat_id: chatId,
    user_id: userId,
  }));

  const { error: participantError } = await supabase
    .from("chat_participants")
    .insert(participantRows);

  if (participantError) {
    console.error("Error adding participants:", participantError);
    return null;
  }

  return chat[0]; // Return the created chat
}

export async function fetchUserChats(userId: any) {
  const { data, error } = await supabase
    .from("chats")
    .select(
      `
      id, name, is_group,
      chat_participants!inner(user_id),
      messages(content, created_at)
    `,
    )
    .eq("chat_participants.user_id", userId)
    .order("created_at", { foreignTable: "messages", ascending: false });

  if (error) {
    console.error("Error fetching chats:", error);
    return [];
  }

  return data.map((chat) => ({
    id: chat.id,
    name: chat.name,
    isGroup: chat.is_group,
    lastMessage: chat.messages[0]?.content || "",
    lastMessageTime: chat.messages[0]?.created_at || "",
  }));
}

export async function addParticipant(chatId: any, userId: any) {
  const { error } = await supabase
    .from("chat_participants")
    .insert([{ chat_id: chatId, user_id: userId }]);

  if (error) {
    console.error("Error adding participant:", error);
    return false;
  }

  return true;
}

async function removeParticipant(chatId: any, userId: any) {
  const { error } = await supabase
    .from("chat_participants")
    .delete()
    .eq("chat_id", chatId)
    .eq("user_id", userId);

  if (error) {
    console.error("Error removing participant:", error);
    return false;
  }

  return true;
}

async function fetchChatParticipants(chatId: any) {
  const { data, error } = await supabase
    .from("chat_participants")
    .select("user_id, users(full_name)")
    .eq("chat_id", chatId);

  if (error) {
    console.error("Error fetching participants:", error);
    return [];
  }

  return data.map((participant) => ({
    id: participant.user_id,
    name: participant?.users?.full_name,
  }));
}
