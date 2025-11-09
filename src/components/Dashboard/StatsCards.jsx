// StatsCards.jsx
const StatsCards = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
      {/* Total Requests */}
      <div className="bg-white p-6 rounded-2xl shadow hover-lift transition">
        <p className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
          <span className="text-primary font-semibold">💬</span> Total Requests
        </p>
        <h3 className="text-3xl font-bold">{stats.totalRequests}</h3>
        
      </div>

      {/* Active Swaps */}
      <div className="bg-white p-6 rounded-2xl shadow hover-lift transition">
        <p className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
          <span className="text-secondary font-semibold">🔄</span> Active Swaps
        </p>
        <h3 className="text-3xl font-bold">{stats.activeSwaps}</h3>
       
      </div>

      {/* Completed */}
      <div className="bg-white p-6 rounded-2xl shadow hover-lift transition">
        <p className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
          <span className="text-accent font-semibold">✅</span> Completed
        </p>
        <h3 className="text-3xl font-bold">{stats.completed}</h3>
      </div>

      {/* Avg Rating */}
      <div className="bg-white p-6 rounded-2xl shadow hover-lift transition">
        <p className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
          <span className="text-primary font-semibold">⭐</span> Avg Rating
        </p>
        <h3 className="text-3xl font-bold">{stats.avgRating}</h3>
        
      </div>
    </div>
  );
};

export default StatsCards;