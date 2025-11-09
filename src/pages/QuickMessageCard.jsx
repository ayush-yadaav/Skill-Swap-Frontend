import { useState } from "react";
import { X } from "lucide-react";
import { sendMessage } from "../api/chatApi";
import toast from "react-hot-toast";

const QuickMessageCard = ({ receiverId, receiverName, onClose }) => {
  const stored = JSON.parse(localStorage.getItem("user"));
  const token = stored?.token;

  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);

  const handleSend = async () => {
    if (!text.trim()) {
      toast.error("Message cannot be empty.");
      return;
    }

    setSending(true);

    try {
      const payload = {
        receiverId,
        chatRoomId: `room_${receiverName.toLowerCase()}_temp`,
        message: text.trim(),
      };

      await sendMessage(token, payload);
      toast.success("Message sent successfully!");
      setText("");
      onClose();
    } catch (err) {
      console.error("Quick message error:", err);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-80 p-5">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-primary text-lg">
            Message {receiverName}
          </h3>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <textarea
          rows={3}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your message..."
          className="w-full border rounded-md p-2 text-sm focus:ring-primary focus:ring-1 outline-none"
        />

        <div className="text-right mt-3">
          <button
            disabled={sending}
            onClick={handleSend}
            className={`px-4 py-1.5 rounded-md text-white text-sm ${
              sending
                ? "bg-gray-400"
                : "bg-gradient-to-r from-primary to-secondary hover:opacity-90"
            }`}
          >
            {sending ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickMessageCard;
