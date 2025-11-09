import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Compass,
  Layers,
  Mail,
  MessageCircleIcon,
  User2,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const AfterLoginNavbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("userChange"));
    navigate("/login");
  };

  const navLinks = [
    { to: "/dashboard", icon: <LayoutDashboard className="w-5 h-5" />, title: "Dashboard" },
    { to: "/discover", icon: <Compass className="w-5 h-5" />, title: "Discover" },
    { to: "/skill-manage", icon: <Layers className="w-5 h-5" />, title: "Skills" },
    { to: "/request-data", icon: <Mail className="w-5 h-5" />, title: "Requests" },
    { to: "/messages", icon: <MessageCircleIcon className="w-5 h-5" />, title: "Messages" },
  ];

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

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-5 text-foreground/70">
          {navLinks.map((link, idx) => (
            <Link
              key={idx}
              to={link.to}
              className="p-2 rounded-lg hover:text-primary hover:bg-muted/30 transition"
              title={link.title}
            >
              {link.icon}
            </Link>
          ))}
        </div>

        {/* Profile + Logout (desktop) */}
        <div className="hidden md:flex items-center gap-4">
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

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded-lg text-foreground/70 hover:text-primary transition"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/90 backdrop-blur-md border-t border-gray-200 px-6 py-4 space-y-4"
          >
            <div className="flex flex-col gap-3 text-foreground/80">
              {navLinks.map((link, idx) => (
                <Link
                  key={idx}
                  to={link.to}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/40 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.icon}
                  <span>{link.title}</span>
                </Link>
              ))}
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
              <Link
                to="/user-profile"
                className="flex items-center gap-2 text-foreground/80 hover:text-primary transition"
                onClick={() => setMenuOpen(false)}
              >
                <User2 className="w-5 h-5" />
                <span>Profile</span>
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="flex items-center gap-2 text-white bg-gradient-to-r from-secondary to-accent px-3 py-2 rounded-lg hover:opacity-90 transition"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default AfterLoginNavbar;
