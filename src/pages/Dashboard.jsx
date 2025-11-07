import { use, useEffect, useState } from "react";
import { getUserRequests, getSuggestedMatches } from "../api/requestApi.js";
import StatsCards from "../components/Dashboard/StatsCards.jsx";
import SuggestedMatches from "../components/Dashboard/SuggestedMatches.jsx";
import RecentActivity from "../components/Dashboard/RecentActivity.jsx";
import AfterLoginNavbar from "../components/Navbar/AfterLoginNavbar.jsx";

const Dashboard = () => {
  const [requests, setRequests] = useState([]);
  const [suggested, setSuggested] = useState([]);
  const [loading, setLoading] = useState(true);

  const stored = JSON.parse(localStorage.getItem("user"));
  console.log("STORED USER OBJECT =>", stored);
  const token = stored?.token;
  console.log("TOKEN =>", token);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [reqRes, sugRes] = await Promise.all([
          getUserRequests(token),
          getSuggestedMatches(token),
        ]);
        setRequests(reqRes.requests || []);
        setSuggested(sugRes.matches || []);
      } catch (error) {
        console.error("Error fetching dashboard:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  const stats = {
    totalRequests: requests.length,
    activeSwaps: requests.filter((r) => r.status === "active").length,
    completed: requests.filter((r) => r.status === "completed").length,
    avgRating: 4.8,
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-muted-foreground animate-pulse">
          Loading Dashboard...
        </p>
      </div>
    );
  }

  return (
    <>
      <AfterLoginNavbar />

      <div className="min-h-screen bg-muted/10">
        <main className="pt-28 px-6 lg:px-16 pb-16">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {stored?.user?.name || "User"}!  👋
          </h1>
          <p className="text-muted-foreground mb-10">
            Here's what's happening with your skills
          </p>

          {/* Cards */}
          <StatsCards stats={stats} />

          {/* Suggested & Recent */}
          <div className="grid md:grid-cols-2 gap-8">
            <SuggestedMatches suggested={suggested} />
            <RecentActivity requests={requests} />
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;