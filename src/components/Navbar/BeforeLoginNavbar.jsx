import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, LogIn, UserPlus } from "lucide-react";

const BeforeLoginNavbar = () => {
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
        <div className="flex items-center gap-6 text-foreground/80">
          <Link
            to="/"
            className="flex items-center gap-1.5 hover:text-primary transition-colors font-medium"
          >
            <Home className="w-4 h-4" /> Home
          </Link>
          <Link
            to="/register"
            className="flex items-center gap-1.5 hover:text-primary transition-colors font-medium"
          >
            <UserPlus className="w-4 h-4" /> Register
          </Link>
          <Link
            to="/login"
            className="flex items-center gap-1.5 hover:text-primary transition-colors font-medium"
          >
            <LogIn className="w-4 h-4" /> Login
          </Link>
        </div>
      </div>
    </motion.nav>
  );
};

export default BeforeLoginNavbar;
