import { useState } from "react";
import { Send, X } from "lucide-react";
import { sendSkillRequest } from "../../api/requestApi.js";

const RequestModal = ({ sendTo, close }) => {
  const [offeredSkill, setOfferedSkill] = useState("");
  const [requestedSkill, setRequestedSkill] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!offeredSkill.trim() || !requestedSkill.trim()) {
      alert("Please fill in both skills before sending.");
      return;
    }

    // 🔑 1.  fetch stored JWT
    const stored = localStorage.getItem("user");
    const token = stored ? JSON.parse(stored).token : null;
    console.log(token);

    if (!token) {
      alert("You must be logged in to send a request.");
      return;
    }

    // 📨 2.  build body exactly as backend expects
    const bodyOrder = {
      receiverId: sendTo.user._id,     // first
      offeredSkill: offeredSkill,      // second
      requestedSkill: requestedSkill,  // third
    };

    try {
      setLoading(true);

      // 3️⃣  send through your wrapper so that Authorization header is attached
      const data = await sendSkillRequest(
        token,
        bodyOrder.receiverId,
        bodyOrder.offeredSkill,
        bodyOrder.requestedSkill
      );

      alert(data.message);
      close();
    } catch (error) {
      console.error("❌ error while sending request:", error);
      const msg = error.response?.data?.message || "Error sending request.";
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-8 w-full max-w-md relative">
        <button
          onClick={close}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
          <Send className="w-5 h-5 text-primary" /> Send Request
        </h2>

        <p className="text-sm text-muted-foreground mb-4">
          You’re sending a request to <b>{sendTo.user.name}</b>
        </p>

        <input
          type="text"
          value={offeredSkill}
          onChange={(e) => setOfferedSkill(e.target.value)}
          placeholder="Skill you offer (e.g. Web Development)"
          className="w-full border rounded-xl p-3 text-sm mb-3 focus:ring-2 focus:ring-primary outline-none"
        />
        <input
          type="text"
          value={requestedSkill}
          onChange={(e) => setRequestedSkill(e.target.value)}
          placeholder="Skill you want (e.g. Graphic Design)"
          className="w-full border rounded-xl p-3 text-sm mb-5 focus:ring-2 focus:ring-primary outline-none"
        />

        <button
          className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold hover:opacity-90 flex items-center justify-center gap-2 disabled:opacity-60"
          onClick={handleSend}
          disabled={loading}
        >
          {loading ? "Sending..." : (
            <>
              <Send className="w-5 h-5" /> Send Request
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default RequestModal;