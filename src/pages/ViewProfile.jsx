import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  MapPin,
  Calendar,
  Globe,
  MessageCircle,
  ArrowLeft,
} from "lucide-react";
import { getUserProfile } from "../api/profileApi";
import { getAllSkillProfiles } from "../api/skillsApi";
import QuickMessageCard from "./QuickMessageCard";

const ViewProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const stored = JSON.parse(localStorage.getItem("user"));
  const token = stored?.token;

  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({});
  const [skillData, setSkillData] = useState(null);
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    if (!token || !id) return;
    Promise.all([getUserProfile(token, id), getAllSkillProfiles(token)])
      .then(([user, allSkills]) => {
        setProfile(user);
        const found = allSkills.find((p) => p.user._id === id);
        setSkillData(found || null);
      })
      .catch((err) => console.error("View profile fetch error:", err))
      .finally(() => setLoading(false));
  }, [token, id]);

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center text-muted-foreground">
        Loading profile...
      </div>
    );

  const { name, email, location, createdAt, about, socialLinks = {} } = profile;
  const teach = skillData?.teachSkills || [];
  const learn = skillData?.learnSkills || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted/20 via-white to-muted/20 flex flex-col items-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl rounded-3xl overflow-hidden shadow-xl border border-gray-100"
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-primary to-secondary h-40 sm:h-48 flex items-end px-4 sm:px-6 pb-4">
          <button
            onClick={() => navigate("/discover")}
            className="absolute top-4 left-4 bg-white/70 hover:bg-white/90 text-primary rounded-full p-2 shadow transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 sm:gap-4">
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                name || "User"
              )}&background=60a5fa&color=fff`}
              alt="Profile Avatar"
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-white shadow-lg"
            />
            <div className="text-white drop-shadow-sm">
              <h1 className="text-xl sm:text-2xl font-semibold">{name}</h1>
              <p className="flex items-center gap-2 text-xs sm:text-sm opacity-90">
                <Mail className="w-4 h-4" /> {email}
              </p>
              {location && (
                <p className="flex items-center gap-2 text-xs sm:text-sm opacity-90">
                  <MapPin className="w-4 h-4" /> {location}
                </p>
              )}
              <p className="flex items-center gap-2 text-xs sm:text-sm opacity-90">
                <Calendar className="w-4 h-4" />{" "}
                {createdAt &&
                  `Joined ${new Date(createdAt).toLocaleString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}`}
              </p>
            </div>
          </div>
        </div>

        {/* Info sections */}
        <div className="bg-white p-4 sm:p-6 space-y-6 sm:space-y-8">
          {/* About */}
          <motion.section
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            <h2 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-primary">
              About
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground bg-muted/20 p-3 sm:p-4 rounded-xl leading-relaxed shadow-inner">
              {about || "No bio added yet."}
            </p>
          </motion.section>

          {/* Skills */}
          <motion.section
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-secondary">
              Skills
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              <SkillList
                title="Can Teach"
                color="primary"
                data={teach}
                empty="No teaching skills listed."
              />
              <SkillList
                title="Wants to Learn"
                color="secondary"
                data={learn}
                empty="No learning skills listed."
              />
            </div>
          </motion.section>

          {/* Socials */}
          <motion.section
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-primary">
              Socials
            </h2>
            {Object.keys(socialLinks).length > 0 ? (
              <div className="grid sm:grid-cols-2 gap-3">
                {Object.entries(socialLinks).map(([key, value]) => (
                  <motion.a
                    key={key}
                    href={value || "#"}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-2 border rounded-xl p-3 bg-muted/10 hover:bg-muted/20 transition"
                  >
                    <Globe className="w-4 h-4 text-primary" />
                    <span className="capitalize font-medium text-sm">{key}</span>
                    <span className="text-xs text-muted-foreground break-all">
                      {value || "Not added"}
                    </span>
                  </motion.a>
                ))}
              </div>
            ) : (
              <p className="text-sm italic text-muted-foreground">
                No social links added.
              </p>
            )}
          </motion.section>

          {/* Message Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="pt-2 sm:pt-4 flex justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-2xl shadow-md hover:opacity-90 transition"
              onClick={() => setShowCard(true)}
            >
              <MessageCircle className="w-5 h-5" /> Message
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {showCard && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 flex items-center justify-center bg-black/40 z-50"
          >
            <QuickMessageCard
              receiverId={id}
              receiverName={name}
              onClose={() => setShowCard(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* Reusable SkillList */
const SkillList = ({ title, color, data, empty }) => (
  <div>
    <h3 className={`font-semibold mb-2 text-${color}`}>{title}</h3>
    {data.length > 0 ? (
      <ul className="space-y-2">
        {data.map((s, i) => (
          <motion.li
            key={s._id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            viewport={{ once: true }}
            className="flex flex-col border rounded-xl p-3 bg-muted/10 hover:bg-muted/20 transition"
          >
            <span className="font-medium text-sm">{s.name}</span>
            <span className="text-xs text-muted-foreground">
              {s.category} • {s.level}
            </span>
          </motion.li>
        ))}
      </ul>
    ) : (
      <p className="text-sm italic text-muted-foreground">{empty}</p>
    )}
  </div>
);

export default ViewProfile;
