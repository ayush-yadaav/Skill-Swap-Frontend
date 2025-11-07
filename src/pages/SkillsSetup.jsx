import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { upsertSkillProfile } from "../api/skillsApi.js";
import { Plus, Target, Lightbulb } from "lucide-react";

const SkillsSetup = () => {
  const navigate = useNavigate();

  const [teachInput, setTeachInput] = useState("");
  const [learnInput, setLearnInput] = useState("");
  const [teachSkills, setTeachSkills] = useState([]);
  const [learnSkills, setLearnSkills] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ get stored user safely
  const stored = JSON.parse(localStorage.getItem("user"));
  const token = stored?.token;

  // ✅ redirect if skills already set
  if (stored?.user?.hasSkills) {
    return <Navigate to="/dashboard" replace />;
  }

  // 🧩 add teach skill
  const addTeachSkill = () => {
    if (!teachInput.trim()) return;
    setTeachSkills((prev) => [
      ...prev,
      { name: teachInput.trim(), category: "General", level: "Beginner" },
    ]);
    setTeachInput("");
  };

  // 🧩 add learn skill
  const addLearnSkill = () => {
    if (!learnInput.trim()) return;
    setLearnSkills((prev) => [
      ...prev,
      { name: learnInput.trim(), category: "General", level: "Beginner" },
    ]);
    setLearnInput("");
  };

  // ✅ save skills
  const handleSave = async () => {
    setLoading(true);
    try {
      if (!token) {
        alert("No token found — please log in again.");
        navigate("/login");
        return;
      }

      console.log("🪄 Sending to backend:", { teachSkills, learnSkills });
      const result = await upsertSkillProfile(token, { teachSkills, learnSkills });
      console.log("Backend response:", result);

      // update hasSkills flag in localStorage
      const updatedUser = {
        ...stored,
        user: { ...stored.user, hasSkills: true },
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      alert(result.message || "Skills saved successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error("❌ Skill save error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Error saving skills");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted/30 via-white to-muted/30 flex flex-col items-center justify-center px-4 py-12">
      {/* Heading */}
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
        Let’s set up your skills 💫
      </h1>
      <p className="text-muted-foreground mb-10 text-center max-w-lg">
        Add what you can teach and what you want to learn. You can always edit
        this later.
      </p>

      {/* Skills cards */}
      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-8">
        {/* Teach */}
        <div className="bg-white rounded-2xl shadow-lg p-6 hover-lift transition">
          <h2 className="text-lg font-semibold flex items-center gap-2 mb-4 text-primary">
            <Lightbulb className="w-5 h-5" /> Skills You Can Teach
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            Share your expertise with others
          </p>

          <div className="flex items-center gap-2 mb-4">
            <input
              type="text"
              value={teachInput}
              onChange={(e) => setTeachInput(e.target.value)}
              placeholder="e.g., React, Design, Guitar..."
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

          {teachSkills.length > 0 ? (
            <ul className="flex flex-wrap gap-2">
              {teachSkills.map((s, i) => (
                <li
                  key={i}
                  className="text-sm text-foreground bg-muted/40 rounded-lg px-3 py-1"
                >
                  {s.name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground italic">
              Your teaching skills will appear here...
            </p>
          )}
        </div>

        {/* Learn */}
        <div className="bg-white rounded-2xl shadow-lg p-6 hover-lift transition">
          <h2 className="text-lg font-semibold flex items-center gap-2 mb-4 text-secondary">
            <Target className="w-5 h-5" /> Skills You Want to Learn
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            Discover new talents and grow
          </p>

          <div className="flex items-center gap-2 mb-4">
            <input
              type="text"
              value={learnInput}
              onChange={(e) => setLearnInput(e.target.value)}
              placeholder="e.g., UI/UX, Node.js, Piano..."
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

          {learnSkills.length > 0 ? (
            <ul className="flex flex-wrap gap-2">
              {learnSkills.map((s, i) => (
                <li
                  key={i}
                  className="text-sm text-foreground bg-muted/40 rounded-lg px-3 py-1"
                >
                  {s.name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground italic">
              Skills you want to learn will appear here...
            </p>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mt-10">
        <button
          onClick={handleSave}
          disabled={loading}
          className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl shadow hover:opacity-90 transition"
        >
          {loading ? "Saving..." : "Continue to Dashboard"}
        </button>

        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="px-6 py-3 border border-border text-muted-foreground rounded-xl hover:bg-muted/20 transition"
        >
          Skip for now
        </button>
      </div>

      <p className="text-xs text-muted-foreground mt-4">
        💡 Tip: You can edit this anytime in your profile
      </p>
    </div>
  );
};

export default SkillsSetup;