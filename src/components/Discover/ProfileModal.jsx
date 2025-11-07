import { Send, X } from "lucide-react";

const ProfileModal = ({ profile, close, onRequest }) => (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white rounded-3xl p-8 w-full max-w-lg relative overflow-y-auto max-h-[90vh]">
      <button
        onClick={close}
        className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
      >
        <X className="w-5 h-5" />
      </button>

      <h2 className="text-2xl font-bold mb-1">{profile.user.name}</h2>
      <p className="text-sm text-muted-foreground mb-6">
        {profile.user.email}
      </p>

      <p className="font-medium mb-1">Teaching Skills</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {profile.teachSkills.map((s, i) => (
          <span
            key={i}
            className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
          >
            {s.name}
          </span>
        ))}
      </div>

      <p className="font-medium mb-1">Learning Skills</p>
      <div className="flex flex-wrap gap-2 mb-6">
        {profile.learnSkills.map((s, i) => (
          <span
            key={i}
            className="px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-medium"
          >
            {s.name}
          </span>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          onClick={onRequest}
          className="flex-1 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold hover:opacity-90 flex items-center justify-center gap-2"
        >
          <Send className="w-5 h-5" /> Send Request
        </button>
        <button className="flex-1 py-3 border border-border rounded-xl font-semibold hover:bg-muted/20">
          Start Chat
        </button>
      </div>
    </div>
  </div>
);

export default ProfileModal;