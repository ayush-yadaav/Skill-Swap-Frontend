import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Home, LogIn, UserPlus, Menu, X } from "lucide-react";

const BeforeLoginNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Home", icon: <Home className="w-4 h-4" /> },
    { to: "/register", label: "Register", icon: <UserPlus className="w-4 h-4" /> },
    { to: "/login", label: "Login", icon: <LogIn className="w-4 h-4" /> },
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
        <div className="hidden md:flex items-center gap-6 text-foreground/80">
          {navLinks.map((link, idx) => (
            <Link
              key={idx}
              to={link.to}
              className="flex items-center gap-1.5 hover:text-primary transition-colors font-medium"
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded-lg text-foreground/70 hover:text-primary transition"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
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
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/40 transition"
                >
                  {link.icon}
                  <span className="font-medium">{link.label}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default BeforeLoginNavbar;
