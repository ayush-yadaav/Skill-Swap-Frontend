import axios from "axios";

// ✅ define once, top of file
const API_URL = "https://skill-sqap-backend.vercel.app/api"; 
// adjust to your backend route base, if it’s just /api or /api/chat, set accordingly

// --- Existing endpoints ---
export const getUserChats = async (token) =>
  (await axios.get(`${API_URL}/chat/user/chats`, {
    headers: { Authorization: `Bearer ${token}` },
  })).data;

// export const getMessagesByRoom = async (token, roomId) =>
//   (await axios.get(`${API_URL}/${roomId}`, {
//     headers: { Authorization: `Bearer ${token}` },
//   })).data;

// export const sendMessage = async (token, payload) =>
//   await axios.post(`${API_URL}/message`, payload, {
//     headers: { Authorization: `Bearer ${token}` },
//   });

export const getMessagesByRoom = async (token, chatRoomId) => {
  const res = await axios.get(`${API_URL}/chat/${chatRoomId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const sendMessage = async (token, data) => {
  const res = await axios.post(`${API_URL}/chat/send`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// --- 🆕 additions ---
export const markMessagesAsRead = async (token, chatRoomId) =>
  await axios.put(`${API_URL}/chat/read/${chatRoomId}`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteMessageApi = async (token, messageId) =>
  await axios.delete(`${API_URL}/chat/message/${messageId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteChatApi = async (token, chatRoomId) =>
  await axios.delete(`${API_URL}/chat/chat/${chatRoomId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });