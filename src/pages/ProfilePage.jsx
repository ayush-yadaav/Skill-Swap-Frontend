import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { Mail, MapPin, Calendar, Save, LogOut } from "lucide-react";
import { getUserProfile, updateUserProfile } from "../api/profileApi";
import { getAllSkillProfiles } from "../api/skillsApi";
import AfterLoginNavbar from "../components/Navbar/AfterLoginNavbar";

const ProfilePage = () => {
  const navigate = useNavigate();
  const stored = JSON.parse(localStorage.getItem("user"));
  const token = stored?.token;
  const userId = stored?.user?.id;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("About");
  const [profile, setProfile] = useState({});
  const [skillData, setSkillData] = useState(null);

  useEffect(() => {
    if (!token || !userId) return;
    Promise.all([getUserProfile(token, userId), getAllSkillProfiles(token)])
      .then(([user, allSkills]) => {
        setProfile({
          name: user.name,
          email: user.email,
          location: user.location || "",
          about: user.about || "",
          socialLinks: user.socialLinks || {
            twitter: "",
            linkedin: "",
            github: "",
          },
          createdAt: user.createdAt,
        });
        const found = allSkills.find((p) => p.user._id === userId);
        setSkillData(found || null);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        toast.error("Error loading profile data");
      })
      .finally(() => setLoading(false));
  }, [token, userId]);

  const handleSave = async () => {
    setSaving(true);
    const savingToast = toast.loading("Saving changes...");
    try {
      const res = await updateUserProfile(token, profile);
      toast.success(res.message || "Profile updated successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error updating profile");
    } finally {
      setSaving(false);
      toast.dismiss(savingToast);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    setTimeout(() => navigate("/login"), 1000);
  };

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center text-muted-foreground">
        Loading profile...
      </div>
    );

  const teach = skillData?.teachSkills || [];
  const learn = skillData?.learnSkills || [];

  return (
    <>
      <AfterLoginNavbar />
      <Toaster position="top-center" reverseOrder={false} />

      <div className="min-h-screen bg-gradient-to-b from-muted/20 via-white to-muted/20 flex flex-col items-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-3xl"
        >
          {/* header */}
          <div className="bg-gradient-to-r from-primary to-secondary h-36 sm:h-40 rounded-t-3xl relative flex flex-col sm:flex-row sm:items-start justify-between p-3 sm:p-4">
            {/* buttons */}
            <div className="flex items-center gap-2 sm:gap-3 ml-auto flex-wrap sm:flex-nowrap">
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 bg-white/80 hover:bg-white text-primary font-semibold px-3 sm:px-4 py-2 rounded-full shadow transition text-sm sm:text-base"
              >
                <Save className="w-4 h-4" />
                {saving ? "Saving..." : "Save"}
              </button>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-white/80 hover:bg-white text-secondary font-semibold px-3 sm:px-4 py-2 rounded-full shadow transition text-sm sm:text-base"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </div>

            {/* avatar & info */}
            <div className="absolute -bottom-10 left-4 sm:left-6 flex items-center gap-3 sm:gap-4 flex-wrap sm:flex-nowrap">
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                  profile.name || "User"
                )}&background=60a5fa&color=fff`}
                alt="Profile Avatar"
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-blue-400 shadow-md"
              />
              <div className="mt-2 sm:mt-0">
                <h1 className="text-xl sm:text-2xl font-semibold text-black drop-shadow">
                  {profile.name}
                </h1>
                <div className="flex flex-col sm:flex-row sm:flex-wrap gap-1 sm:gap-3 text-xs sm:text-sm text-black drop-shadow-sm">
                  <span className="flex items-center gap-1">
                    <Mail className="w-4 h-4" /> {profile.email}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />{" "}
                    {profile.location || "Add location"}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />{" "}
                    {profile.createdAt
                      ? `Joined ${new Date(profile.createdAt).toLocaleString(
                          "en-US",
                          { month: "long", year: "numeric" }
                        )}`
                      : ""}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* content */}
          <div className="bg-white rounded-b-3xl shadow-md mt-16 sm:mt-14 p-4 sm:p-6">
            {/* Tabs */}
            <div className="flex justify-center flex-wrap gap-2 sm:gap-4 mb-6">
              {["About", "Skills", "Socials"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 sm:px-6 py-2 rounded-full font-medium transition text-sm sm:text-base ${
                    activeTab === tab
                      ? "bg-primary text-white shadow"
                      : "bg-muted/50 hover:bg-muted text-muted-foreground"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* About */}
            {activeTab === "About" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Bio</label>
                  <textarea
                    value={profile.about}
                    onChange={(e) =>
                      setProfile((p) => ({ ...p, about: e.target.value }))
                    }
                    rows={4}
                    className="w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary outline-none"
                    placeholder="Write a short introduction..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Location
                  </label>
                  <input
                    value={profile.location}
                    onChange={(e) =>
                      setProfile((p) => ({ ...p, location: e.target.value }))
                    }
                    className="w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary outline-none"
                    placeholder="City, Country"
                  />
                </div>
              </div>
            )}

            {/* Skills */}
            {activeTab === "Skills" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-primary">
                    Skills You Can Teach
                  </h3>
                  {teach.length > 0 ? (
                    <ul className="space-y-2">
                      {teach.map((s) => (
                        <li
                          key={s._id}
                          className="flex flex-col border rounded-xl p-3 bg-muted/20 text-sm"
                        >
                          <span className="font-medium">{s.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {s.category} • {s.level}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm italic text-muted-foreground">
                      No teaching skills added yet.
                    </p>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-secondary">
                    Skills You Want to Learn
                  </h3>
                  {learn.length > 0 ? (
                    <ul className="space-y-2">
                      {learn.map((s) => (
                        <li
                          key={s._id}
                          className="flex flex-col border rounded-xl p-3 bg-muted/20 text-sm"
                        >
                          <span className="font-medium">{s.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {s.category} • {s.level}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm italic text-muted-foreground">
                      No learning skills added yet.
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Socials */}
            {activeTab === "Socials" && (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground mb-4">
                  Add or update your social links.
                </p>
                {Object.entries(profile.socialLinks).map(([key, value]) => (
                  <div key={key}>
                    <label className="block text-sm font-medium mb-1 capitalize">
                      {key}
                    </label>
                    <input
                      type="text"
                      value={value}
                      onChange={(e) =>
                        setProfile((p) => ({
                          ...p,
                          socialLinks: {
                            ...p.socialLinks,
                            [key]: e.target.value,
                          },
                        }))
                      }
                      className="w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary outline-none"
                      placeholder={`Your ${key} URL`}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default ProfilePage;
