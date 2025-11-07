import { Link } from "react-router-dom";

// SuggestedMatches.jsx
const SuggestedMatches = ({ suggested }) => (
  <div className="bg-white rounded-2xl p-6 shadow">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold flex items-center gap-2">
        <span className="text-primary">✨</span> Suggested Matches
      </h2>
      <button className="text-sm text-primary hover:underline font-medium">
       <Link to="/discover"> View All →</Link>
      </button>
    </div>

    <div className="space-y-4">
      {suggested.length > 0 ? (
        suggested.map((match) => (
          <div
            key={match.id}
            className="flex items-center justify-between border-b border-border pb-3 last:border-0"
          >
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-bold flex items-center justify-center uppercase">
                {match.name?.charAt(0)}
                {match.name?.split(" ")[1]?.charAt(0)}
              </div>
              <div>
                <p className="font-medium">{match.name}</p>
                <p className="text-sm text-muted-foreground">
                  Offers: {match.teachSkills?.join(", ") || "–"} <br />
                  Wants: {match.learnSkills?.join(", ") || "–"}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-sm text-muted-foreground">No matches found yet.</p>
      )}
    </div>
  </div>
);

export default SuggestedMatches;