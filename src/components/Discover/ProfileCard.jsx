import { Star, Send, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProfileCard = ({ profile, onView, onRequest }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover-lift transition">
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-lg font-semibold">{profile.user?.name}</h3>
          <p className="text-xs text-muted-foreground">{profile.user?.email}</p>

          {/* ✅ Location line */}
          {(profile.location || profile.user?.location) && (
            <p className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
              <MapPin className="w-3 h-3 text-secondary" />
              {profile.location || profile.user?.location}
            </p>
          )}
        </div>

        <span className="flex items-center gap-1 text-primary font-semibold">
          <Star className="w-4 h-4 fill-primary" /> 4.8
        </span>
      </div>

      {/* Skills */}
      <Section title="Teaches" color="primary" skills={profile.teachSkills} />
      <Section title="Learns" color="secondary" skills={profile.learnSkills} />

      {/* Actions */}
      <div className="flex justify-between mt-6">
        <button
          onClick={onRequest}
          className="flex items-center gap-2 px-4 py-2 text-sm bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-xl"
        >
          <Send className="w-4 h-4" /> Request
        </button>

        <button
          onClick={() => navigate(`/user/${profile.user._id}`)}  // ✅ proper navigation
          className="px-3 py-1 rounded-full bg-primary text-white text-sm hover:opacity-90"
        >
          View Profile
        </button>
      </div>
    </div>
  );
};

const Section = ({ title, color, skills = [] }) => (
  <div className="mb-4">
    <p className="font-medium mb-1 text-foreground">{title}:</p>
    <div className="flex flex-wrap gap-2">
      {skills.slice(0, 3).map((s, i) => (
        <span
          key={i}
          className={`px-3 py-1 rounded-full bg-${color}/10 text-${color} text-xs font-medium`}
        >
          {s.name}
        </span>
      ))}
      {skills.length === 0 && (
        <span className="text-xs text-muted-foreground italic">
          No skills listed
        </span>
      )}
    </div>
  </div>
);

export default ProfileCard;