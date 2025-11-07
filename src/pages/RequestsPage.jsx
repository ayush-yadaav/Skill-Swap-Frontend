import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, MessageSquare } from "lucide-react";
import { getUserRequests, updateRequestStatus } from "../api/requestDataApi";
import AfterLoginNavbar from "../components/Navbar/AfterLoginNavbar";

const RequestCard = ({ req, token, refresh, currentUserId }) => {
  const { sender, receiver, status, offeredSkill, requestedSkill, createdAt } = req;

  const timeAgo = (() => {
    const diff = Math.floor((Date.now() - new Date(createdAt)) / 60000);
    if (diff < 1) return "just now";
    if (diff < 60) return `${diff}m ago`;
    const hrs = Math.floor(diff / 60);
    return `${hrs}h ago`;
  })();

  const handleAction = async (newStatus) => {
    await updateRequestStatus(token, req._id, newStatus);
    refresh();
  };

  const firstLetter = sender?.name?.charAt(0)?.toUpperCase() || "?";
  const isReceiver = receiver?._id === currentUserId;
  const isSender = sender?._id === currentUserId;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
      className="bg-white rounded-2xl shadow-md px-6 py-4 flex items-center justify-between mb-3"
    >
      {/* left: avatar + name */}
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary/60 to-secondary/60 flex items-center justify-center font-semibold text-white">
          {firstLetter}
        </div>
        <div>
          <h3 className="font-semibold text-foreground">
            {isSender ? receiver?.name : sender?.name}
          </h3>
          <div className="text-xs text-muted-foreground">{timeAgo}</div>
        </div>
      </div>

      {/* middle: skill tags */}
      <div className="flex-1 text-center text-sm text-muted-foreground">
        <span className="bg-muted/40 px-2 py-1 rounded-full text-foreground font-medium mr-1">
          {offeredSkill}
        </span>
        ↔
        <span className="bg-muted/40 px-2 py-1 rounded-full text-foreground font-medium ml-1">
          {requestedSkill}
        </span>
      </div>

      {/* right: status + buttons */}
      <div className="flex items-center gap-2">
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full ${
            status === "pending"
              ? "bg-yellow-100 text-yellow-700"
              : status === "accepted"
              ? "bg-green-100 text-green-700"
              : status === "completed"
              ? "bg-blue-100 text-blue-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {status}
        </span>

        {/* ✅ show buttons only for receiver when pending */}
        {isReceiver && status === "pending" && (
          <>
            <button
              onClick={() => handleAction("accepted")}
              className="bg-green-100 hover:bg-green-200 text-green-700 rounded-full p-2 transition"
            >
              <Check className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleAction("rejected")}
              className="bg-red-100 hover:bg-red-200 text-red-700 rounded-full p-2 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </>
        )}

        {/* 💬 optionally, allow receiver to mark completed */}
        {isReceiver && status === "accepted" && (
          <button
            onClick={() => handleAction("completed")}
            className="bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-full p-2 transition"
          >
            <MessageSquare className="w-4 h-4" />
          </button>
        )}
      </div>
    </motion.div>
  );
};

const RequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const [activeTab, setActiveTab] = useState("pending");
  const [loading, setLoading] = useState(false);

  const stored = JSON.parse(localStorage.getItem("user"));
  const token = stored?.token;
  const currentUserId = stored?.user?.id;

  const fetchRequests = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await getUserRequests(token);
      setRequests(res.requests || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const filtered = requests.filter((r) => r.status === activeTab);

  return (
    <>
      <AfterLoginNavbar />
      <div className="min-h-screen bg-gradient-to-b from-muted/30 via-white to-muted/30 flex flex-col items-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-3xl"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Swap Requests
          </h1>
          <p className="text-muted-foreground mb-8 text-center">
            Manage your skill exchange requests
          </p>

          {/* Tabs */}
          <div className="flex justify-center gap-8 mb-8">
            {["pending", "accepted", "completed"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full font-medium transition ${
                  activeTab === tab
                    ? "bg-primary text-white shadow"
                    : "bg-white text-muted-foreground hover:bg-muted/30"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Content */}
          {loading ? (
            <p className="text-center text-sm text-muted-foreground">
              Loading...
            </p>
          ) : filtered.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground">
              No {activeTab} requests found.
            </p>
          ) : (
            <div>
              <AnimatePresence>
                {filtered.map((r) => (
                  <RequestCard
                    key={r._id}
                    req={r}
                    token={token}
                    currentUserId={currentUserId}
                    refresh={fetchRequests}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      </div>
    </>
  );
};

export default RequestsPage;
