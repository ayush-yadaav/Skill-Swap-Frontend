import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  LogOut,
  Home,
  Compass,
  Layers,
  Mail,
  User2,
  LayoutDashboard,
  LogIn,
  UserPlus,
  MessageCircleIcon,
} from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch {
      return null;
    }
  });

  // 🔄 keep localStorage and state synced across all tabs + same tab
  useEffect(() => {
    const syncUser = () => {
      try {
        setUser(JSON.parse(localStorage.getItem("user")) || null);
      } catch {
        setUser(null);
      }
    };
    window.addEventListener("storage", syncUser);     // other tabs
    window.addEventListener("userChange", syncUser);  // same tab
    return () => {
      window.removeEventListener("storage", syncUser);
      window.removeEventListener("userChange", syncUser);
    };
  }, []);

  // 🚪 logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("userChange"));
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md border-b border-border z-50">
      <div className="container mx-auto flex justify-between items-center py-3 px-6">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-r from-primary to-secondary text-white text-lg font-bold shadow-md"
        >
          S
        </Link>

        {/* ---------- PUBLIC NAV ---------- */}
        {!user && (
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="flex items-center gap-1.5 text-foreground/80 hover:text-primary transition-colors font-medium"
            >
              <Home className="w-4 h-4" /> Home
            </Link>
            <Link
              to="/register"
              className="flex items-center gap-1.5 text-foreground/80 hover:text-primary transition-colors font-medium"
            >
              <UserPlus className="w-4 h-4" /> Register
            </Link>
            <Link
              to="/login"
              className="flex items-center gap-1.5 text-foreground/80 hover:text-primary transition-colors font-medium"
            >
              <LogIn className="w-4 h-4" /> Login
            </Link>
          </div>
        )}

        {/* ---------- LOGGED‑IN NAV ---------- */}
        {user && (
          <>
            <div className="flex items-center gap-5 text-foreground/70">
              <Link
                to="/dashboard"
                className="p-2 rounded-lg hover:text-primary hover:bg-muted/30 transition"
                title="Dashboard"
              >
                <LayoutDashboard className="w-5 h-5" />
              </Link>
              <Link
                to="/discover"
                className="p-2 rounded-lg hover:text-primary hover:bg-muted/30 transition"
                title="Discover"
              >
                <Compass className="w-5 h-5" />
              </Link>
              <Link
                to="/skill-manage"
                className="p-2 rounded-lg hover:text-primary hover:bg-muted/30 transition"
                title="Skills"
              >
                <Layers className="w-5 h-5" />
              </Link>
              <Link
                to="/request-data"
                className="p-2 rounded-lg hover:text-primary hover:bg-muted/30 transition"
                title="Requests"
              >
                <Mail className="w-5 h-5" />
              </Link>
              <Link
                to="/messages"
                className="p-2 rounded-lg hover:text-primary hover:bg-muted/30 transition"
                title="Messages"
              >
                <MessageCircleIcon className="w-5 h-5" />
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <Link
                to="/user-profile"
                className="p-2 rounded-full hover:bg-muted/30 text-foreground/70 hover:text-primary transition"
                title="Profile"
              >
                <User2 className="w-5 h-5" />
              </Link>
              <button
                onClick={handleLogout}
                className="p-2 rounded-full bg-gradient-to-r from-secondary to-accent text-white hover:opacity-90 transition"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;