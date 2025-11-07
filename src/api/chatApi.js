// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:8080/api/chat",    // backend port
//   withCredentials: true,
// });

// export const getUserChats = async (token) => {
//   const res = await API.get("/user/chats", {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   return res.data;
// };

// export const getMessagesByRoom = async (token, chatRoomId) => {
//   const res = await API.get(`/${chatRoomId}`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   return res.data;
// };

// export const sendMessage = async (token, data) => {
//   const res = await API.post("/send", data, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   return res.data;
// };


// /** 🆕 mark all messages in room as read */
// export const markMessagesAsRead = async (token, chatRoomId) =>
//   await axios.put(`${API_URL}/read/${chatRoomId}`, {}, {
//     headers: { Authorization: `Bearer ${token}` },
//   });

// /** 🆕 delete a single message */
// export const deleteMessageApi = async (token, messageId) =>
//   await axios.delete(`${API_URL}/message/${messageId}`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });

// /** 🆕 delete an entire chat */
// export const deleteChatApi = async (token, chatRoomId) =>
//   await axios.delete(`${API_URL}/chat/${chatRoomId}`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });

import axios from "axios";

// ✅ define once, top of file
const API_URL = "http://localhost:8080/api"; 
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