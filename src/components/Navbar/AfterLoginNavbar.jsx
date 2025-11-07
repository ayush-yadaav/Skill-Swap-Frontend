import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Compass,
  Layers,
  Mail,
  MessageCircleIcon,
  User2,
  LogOut,
} from "lucide-react";

const AfterLoginNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("userChange"));
    navigate("/login");
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50"
    >
      <div className="container mx-auto flex justify-between items-center py-3 px-6">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-r from-primary to-secondary text-white text-lg font-bold shadow-md"
        >
          S
        </Link>

        {/* Links */}
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

        {/* Profile + Logout */}
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
      </div>
    </motion.nav>
  );
};

export default AfterLoginNavbar;
