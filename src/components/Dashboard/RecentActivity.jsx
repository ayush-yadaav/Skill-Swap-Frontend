import { useState } from "react";
import { ChevronDown, ChevronUp, Clock } from "lucide-react";

const RecentActivity = ({ requests = [] }) => {
  const [showAll, setShowAll] = useState(false);

  const visibleRequests = showAll ? requests.slice().reverse() : requests.slice().reverse().slice(0, 4);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow duration-300">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <span className="text-primary"><Clock className="w-5 h-5" /></span>
          Recent Activity
        </h2>

        {requests.length > 4 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-sm font-medium text-primary hover:underline flex items-center gap-1"
          >
            {showAll ? (
              <>
                Show Less <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                View All <ChevronDown className="w-4 h-4" />
              </>
            )}
          </button>
        )}
      </div>

      <div className="space-y-4 divide-y divide-border">
        {visibleRequests.length > 0 ? (
          visibleRequests.map((req, index) => (
            <div
              key={req._id || index}
              className="pt-1 pb-3 first:pt-0 last:pb-0 flex justify-between items-start group"
            >
              <div className="flex-1">
                <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                  {req.sender?.name || "You"}{" "}
                  <span className="text-muted-foreground font-normal">
                    {req.status === "accepted"
                      ? "accepted your swap request"
                      : req.status === "completed"
                      ? "completed a swap with you"
                      : req.status === "pending"
                      ? "sent you a new request"
                      : req.status === "rejected"
                      ? "rejected your request"
                      : `updated request status to ${req.status}`}
                  </span>
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {new Date(req.updatedAt || req.createdAt).toLocaleString()}
                </p>
              </div>
              <span
                className={`ml-3 px-3 py-1 text-xs font-semibold rounded-full ${
                  req.status === "completed"
                    ? "bg-green-100 text-green-700"
                    : req.status === "accepted"
                    ? "bg-blue-100 text-blue-700"
                    : req.status === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : req.status === "rejected"
                    ? "bg-red-100 text-red-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {req.status?.toUpperCase() || "STATUS"}
              </span>
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">No recent activity yet.</p>
        )}
      </div>

      {/* subtle divider */}
      {requests.length > 4 && !showAll && (
        <div className="mt-4 text-center text-xs text-muted-foreground">
          Showing latest 4 activities
        </div>
      )}
    </div>
  );
};

export default RecentActivity;