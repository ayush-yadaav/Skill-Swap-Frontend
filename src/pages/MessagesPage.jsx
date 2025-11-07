import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { io } from "socket.io-client";
import { Send, ArrowLeft } from "lucide-react";
import {
  getUserChats,
  getMessagesByRoom,
  sendMessage,
  deleteMessageApi,
  deleteChatApi,
  markMessagesAsRead,
} from "../api/chatApi";
import AfterLoginNavbar from "../components/Navbar/AfterLoginNavbar";

const SOCKET_URL = "https://skill-sqap-backend.vercel.app";

const MessagesPage = () => {
  const stored = JSON.parse(localStorage.getItem("user"));
  const token = stored?.token;
  const currentUserId = stored?.user?.id;

  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [mobileView, setMobileView] = useState(window.innerWidth < 768);

  const scrollRef = useRef(null);
  const socket = useRef();

  // 📱 track window size
  useEffect(() => {
    const handleResize = () => setMobileView(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /** ✳️ Append message only if unique */
  const appendUniqueMessage = (msg) => {
    setMessages((prev) => {
      const exists = prev.some((m) => m._id && m._id === msg._id);
      return exists ? prev : [...prev, msg];
    });
  };

  /** 🧠 Connect socket and listen */
  useEffect(() => {
    socket.current = io(SOCKET_URL);
    if (selectedChat?._id) socket.current.emit("joinRoom", selectedChat._id);

    socket.current.on("receiveMessage", (msg) => {
      if (msg.sender?._id === currentUserId) return;
      appendUniqueMessage(msg);
    });

    return () => socket.current.disconnect();
  }, [selectedChat, currentUserId]);

  /** 🔄 Load chats */
  useEffect(() => {
    if (!token) return;
    getUserChats(token).then(async (res) => {
      const enriched = await Promise.all(
        res.chats.map(async (chat) => {
          const { messages } = await getMessagesByRoom(token, chat._id);
          const first = messages[0];
          if (first) {
            const participant =
              first.sender._id === currentUserId ? first.receiver : first.sender;
            return { ...chat, participant };
          }
          return { ...chat };
        })
      );
      setChats(enriched);
    });
  }, [token, currentUserId]);

  /** 📥 Load messages */
  useEffect(() => {
    if (!selectedChat || !token) return;
    getMessagesByRoom(token, selectedChat._id).then(async (res) => {
      const msgs = res.messages || [];
      setMessages(msgs);
      await markMessagesAsRead(token, selectedChat._id);
    });
  }, [selectedChat, token]);

  /** 🪄 Auto scroll */
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /** 🚀 Send */
  const handleSend = async () => {
    if (!newMessage.trim() || !selectedChat) return;
    const payload = {
      chatRoomId: selectedChat._id,
      receiverId: selectedChat.participant?._id,
      message: newMessage.trim(),
    };
    try {
      const res = await sendMessage(token, payload);
      let newMsg = res.data || {};
      newMsg = {
        ...newMsg,
        sender: { _id: currentUserId, name: stored?.user?.name || "You" },
        _tempKey: `${Date.now()}-${Math.random()}`,
      };
      appendUniqueMessage(newMsg);
      socket.current.emit("sendMessage", {
        chatRoomId: selectedChat._id,
        message: newMsg,
      });
      setNewMessage("");
    } catch (err) {
      console.error(err);
    }
  };

  /** 🧹 Delete one */
  const handleDeleteMessage = async (id) => {
    setMessages((p) => p.filter((m) => m._id !== id));
    try {
      await deleteMessageApi(token, id);
    } catch (err) {
      console.error("Error deleting:", err);
    }
  };

  /** 💣 Delete chat */
  const handleDeleteChat = async () => {
    if (!selectedChat || !window.confirm("Delete this chat?")) return;
    try {
      await deleteChatApi(token, selectedChat._id);
      setChats((p) => p.filter((c) => c._id !== selectedChat._id));
      setSelectedChat(null);
      setMessages([]);
    } catch (err) {
      console.error(err);
    }
  };

  /** 💅 Render */
  return (
    <>

    <AfterLoginNavbar />
    <div className="flex h-[calc(100vh-5rem)] bg-gradient-to-b from-muted/20 via-white to-muted/20 rounded-3xl border border-border shadow overflow-hidden">

      {/* -------- Sidebar -------- */}
      <AnimatePresence initial={false}>
        {(!mobileView || !selectedChat) && (
          <motion.aside
            key="aside"
            initial={{ x: -60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -60, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full sm:w-72 flex-shrink-0 border-r border-border bg-white/80 backdrop-blur flex flex-col"
          >
            <h2 className="text-lg font-semibold p-4 border-b border-border text-primary">
              Messages
            </h2>
            <ul className="overflow-y-auto flex-1">
              {chats.length ? (
                chats.map((chat) => (
                  <motion.li
                    whileTap={{ scale: 0.97 }}
                    key={chat._id}
                    onClick={() => setSelectedChat(chat)}
                    className={`px-5 py-3 cursor-pointer rounded-xl mx-2 my-1 transition ${
                      selectedChat?._id === chat._id
                        ? "bg-gradient-to-r from-primary/10 to-secondary/10"
                        : "hover:bg-muted/40"
                    }`}
                  >
                    <p className="font-medium truncate">
                      {chat.participant?.name ||
                        chat.participantName ||
                        "Chat"}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {chat.lastMessage || ""}
                    </p>
                  </motion.li>
                ))
              ) : (
                <p className="text-sm text-muted-foreground p-4 italic">
                  No chats yet
                </p>
              )}
            </ul>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* -------- Chat Area -------- */}
      <AnimatePresence mode="wait">
        {selectedChat && (
          <motion.section
            key="chat"
            initial={{ x: 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 60, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col bg-white/70"
          >
            {/* Header */}
            <div className="p-4 border-b border-border flex justify-between items-center bg-white rounded-tr-3xl">
              <div className="flex items-center gap-3">
                {mobileView && (
                  <button
                    onClick={() => setSelectedChat(null)}
                    className="p-1 rounded-full hover:bg-muted transition"
                  >
                    <ArrowLeft className="w-5 h-5 text-primary" />
                  </button>
                )}
                <h3 className="font-semibold text-base text-primary">
                  {selectedChat.participant?.name ||
                    selectedChat.participantName ||
                    "Chat"}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-secondary font-medium hidden sm:inline">
                  Online
                </span>
                <button
                  onClick={handleDeleteChat}
                  className="text-xs opacity-60 hover:opacity-100"
                  title="Delete chat"
                >
                  🗑️
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 bg-gradient-to-b from-white to-muted/20">
              {messages.map((m) => (
                <motion.div
                  layout
                  key={m._id || m._tempKey || crypto.randomUUID()}
                  ref={scrollRef}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${
                    m.sender?._id === currentUserId
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`relative px-4 py-2 rounded-2xl max-w-[80%] sm:max-w-xs text-sm shadow ${
                      m.sender?._id === currentUserId
                        ? "bg-gradient-to-r from-primary to-secondary text-white"
                        : "bg-muted/50 text-foreground"
                    }`}
                  >
                    <p className="break-words">{m.message}</p>
                    {m.sender?._id === currentUserId && !m.isDeleted && (
                      <button
                        onClick={() => handleDeleteMessage(m._id)}
                        className="absolute top-1 right-2 text-xs opacity-60 hover:opacity-100"
                        title="Delete message"
                      >
                        🗑️
                      </button>
                    )}
                    <span className="text-[10px] opacity-70 block mt-1 text-right">
                      {new Date(m.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Input */}
            <div className="border-t border-border p-2 sm:p-4 bg-white flex gap-2 items-center rounded-b-3xl">
              <input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type a message..."
                className="flex-1 text-sm border rounded-full px-3 py-2 outline-none focus:ring-2 focus:ring-primary text-foreground bg-white"
              />
              <button
                onClick={handleSend}
                className="p-2 sm:p-2.5 rounded-full bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 transition"
              >
                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* -------- Empty state for desktop -------- */}
      {!selectedChat && !mobileView && (
        <div className="flex-1 flex items-center justify-center text-muted-foreground">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <p className="text-base font-medium text-primary mb-2">
              Select a chat to start messaging 💬
            </p>
            <p className="text-xs text-muted-foreground">
              All your conversations will appear here.
            </p>
          </motion.div>
        </div>
      )}
    </div>
    </>
  );
};

export default MessagesPage;