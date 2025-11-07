import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Lightbulb, Target, Plus, Save } from "lucide-react";
import { getMySkillProfile, upsertSkillProfile } from "../api/skillsApi";
import AfterLoginNavbar from "../components/Navbar/AfterLoginNavbar";

const SkillManager = () => {
  const [teachInput, setTeachInput] = useState("");
  const [learnInput, setLearnInput] = useState("");
  const [teachSkills, setTeachSkills] = useState([]);
  const [learnSkills, setLearnSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const stored = JSON.parse(localStorage.getItem("user"));
  const token = stored?.token;

  useEffect(() => {
    if (!token) return;
    const userId = stored?.user?.id;

    // 🟢 fetch existing skills for logged‑in user
    getMySkillProfile(token)
      .then((res) => {
        // if backend sends an array, find matching user
        const data = Array.isArray(res)
          ? res.find((p) => p.user._id === userId)
          : res.profile || res;
        if (data) {
          setTeachSkills(data.teachSkills || []);
          setLearnSkills(data.learnSkills || []);
        } else {
          setTeachSkills([]);
          setLearnSkills([]);
        }
      })
      .catch((err) => console.error("Error fetching skills:", err));
  }, [token]);

  const addTeachSkill = () => {
    if (!teachInput.trim()) return;
    setTeachSkills((prev) => [
      ...prev,
      { name: teachInput.trim(), category: "General", level: "Beginner" },
    ]);
    setTeachInput("");
  };

  const addLearnSkill = () => {
    if (!learnInput.trim()) return;
    setLearnSkills((prev) => [
      ...prev,
      { name: learnInput.trim(), category: "General", level: "Beginner" },
    ]);
    setLearnInput("");
  };

  const handleSave = async () => {
    if (!token) return alert("Login first!");
    setLoading(true);
    try {
      const res = await upsertSkillProfile(token, { teachSkills, learnSkills });
      console.log(res);
      setSaved(true);
      setTimeout(() => setSaved(false), 1500);
    } catch (err) {
      alert(err.response?.data?.message || "Error saving skills");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <AfterLoginNavbar/>
    <div className="min-h-screen bg-gradient-to-b from-muted/30 via-white to-muted/30 flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-5xl"
      >
        {/* heading */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Manage Your Skills 🌟
        </h1>
        <p className="text-muted-foreground mb-10 text-center max-w-xl mx-auto">
          Update or add new skills any time.
        </p>

        {/* two cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* teach column */}
          <div className="bg-white rounded-2xl shadow-lg p-6 transition">
            <h2 className="text-lg font-semibold flex items-center gap-2 mb-3 text-primary">
              <Lightbulb className="w-5 h-5" />
              Skills You Can Teach
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Share your expertise with others
            </p>

            <div className="flex items-center gap-2 mb-4">
              <input
                type="text"
                value={teachInput}
                onChange={(e) => setTeachInput(e.target.value)}
                // 🟣 Placeholder now lists existing skills
                placeholder={
                  teachSkills?.length > 0
                    ? teachSkills.map((s) => s.name).join(", ")
                    : "e.g. React, Design, Guitar..."
                }
                className="flex-1 border rounded-xl py-2 px-3 focus:ring-2 focus:ring-primary outline-none"
              />
              <button
                onClick={addTeachSkill}
                type="button"
                className="bg-gradient-to-r from-primary to-secondary text-white rounded-xl p-2 hover:opacity-90"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-muted-foreground italic">
              Type to update your existing skills or add new ones.
            </p>
          </div>

          {/* learn column */}
          <div className="bg-white rounded-2xl shadow-lg p-6 transition">
            <h2 className="text-lg font-semibold flex items-center gap-2 mb-3 text-secondary">
              <Target className="w-5 h-5" />
              Skills You Want to Learn
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Discover new talents and grow.
            </p>

            <div className="flex items-center gap-2 mb-4">
              <input
                type="text"
                value={learnInput}
                onChange={(e) => setLearnInput(e.target.value)}
                // 🟣 Placeholder lists current learn skills
                placeholder={
                  learnSkills?.length > 0
                    ? learnSkills.map((s) => s.name).join(", ")
                    : "e.g. UI/UX, Node.js, Piano..."
                }
                className="flex-1 border rounded-xl py-2 px-3 focus:ring-2 focus:ring-secondary outline-none"
              />
              <button
                onClick={addLearnSkill}
                type="button"
                className="bg-gradient-to-r from-secondary to-accent text-white rounded-xl p-2 hover:opacity-90"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-muted-foreground italic">
              Type to update your existing skills or add new ones.
            </p>
          </div>
        </div>

        {/* save button */}
        <div className="flex justify-center mt-10">
          <button
            onClick={handleSave}
            disabled={loading}
            className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl shadow hover:opacity-90 transition flex items-center gap-2"
          >
            {loading ? (
              "Saving..."
            ) : (
              <>
                <Save className="w-5 h-5" /> {saved ? "Updated!" : "Save Skills"}
              </>
            )}
          </button>
        </div>

        <p className="text-xs text-muted-foreground mt-4 text-center">
          💡 Tip: You can update or add new skills at any time.
        </p>
      </motion.div>
    </div>
    </>
  );
};

export default SkillManager;