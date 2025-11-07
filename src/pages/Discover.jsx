import { useState, useEffect } from "react";
import { getAllProfiles } from "../api/discoverApi.js";
import SearchBar from "../components/Discover/SearchBar.jsx";
import ProfileCard from "../components/Discover/ProfileCard.jsx";
import FilterModal from "../components/Discover/FilterModal.jsx";
import RequestModal from "../components/Discover/RequestModal.jsx";
import ProfileModal from "../components/Discover/ProfileModal.jsx";
import { SlidersHorizontal } from "lucide-react";
import AfterLoginNavbar from "../components/Navbar/AfterLoginNavbar.jsx";

const Discover = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [viewProfile, setViewProfile] = useState(null);
  const [sendTo, setSendTo] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  const stored = JSON.parse(localStorage.getItem("user"));
  const token = stored?.token;

  useEffect(() => {
    const loadProfiles = async () => {
      setLoading(true);
      try {
        const data = await getAllProfiles(token);
        setProfiles(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadProfiles();
  }, [token]);

  const list = filteredData.length ? filteredData : profiles;
  const searched = list.filter(
    (p) =>
      p.user.name.toLowerCase().includes(search.toLowerCase()) ||
      p.teachSkills.some((s) =>
        s.name.toLowerCase().includes(search.toLowerCase())
      )
  );

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center text-muted-foreground">
        Loading...
      </div>
    );

  return (
   
   <>

   <AfterLoginNavbar />
    <div className="min-h-screen bg-muted/10 px-6 lg:px-14 py-20">
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-bold mb-2">Find Your Match</h1>
          <p className="text-muted-foreground">
            Discover amazing people to exchange skills with
          </p>
        </div>
        <button
          onClick={() => setFilterOpen(true)}
          className="flex items-center gap-2 border border-border px-4 py-2 rounded-xl shadow bg-white hover:bg-muted/20 transition"
        >
          <SlidersHorizontal className="w-4 h-4 text-primary" /> Advanced Filters
        </button>
      </div>

      <SearchBar value={search} onChange={setSearch} />

      {/* grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {searched.map((p) => (
          <ProfileCard
            key={p._id}
            profile={p}
            onView={() => setViewProfile(p)}
            onRequest={() => setSendTo(p)}
          />
        ))}
      </div>

      {filterOpen && (
        <FilterModal
          token={token}
          close={() => setFilterOpen(false)}
          setProfiles={setFilteredData}
        />
      )}

      {sendTo && <RequestModal sendTo={sendTo} close={() => setSendTo(null)} />}
      {viewProfile && (
        <ProfileModal
          profile={viewProfile}
          close={() => setViewProfile(null)}
          onRequest={() => {
            setViewProfile(null);
            setSendTo(viewProfile);
          }}
        />
      )}
    </div>
   </>

  );
};

export default Discover;