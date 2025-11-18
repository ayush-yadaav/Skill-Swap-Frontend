import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { loginUser } from "../api/userApi.js";
import BeforeLoginNavbar from "../components/Navbar/BeforeLoginNavbar.jsx";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await loginUser(formData);
      localStorage.setItem("user", JSON.stringify(res));
      toast.success("Login Successful! Welcome back 👋", {
        style: {
          background: "linear-gradient(to right, #4ade80, #22d3ee)",
          color: "#fff",
        },
        iconTheme: {
          primary: "#fff",
          secondary: "#22d3ee",
        },
        duration:1500,
      });
      window.dispatchEvent(new Event("userChange"));

      setTimeout(() => {
        if (res.user?.hasSkills) navigate("/dashboard");
        else navigate("/skills-setup");
      }, 1000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid credentials 😕", {
        style: {
          background: "linear-gradient(to right, #f87171, #fb923c)",
          color: "#fff",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <BeforeLoginNavbar />
      <Toaster position="top-center" reverseOrder={false} />

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 px-4 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md w-full bg-white/90 backdrop-blur-md rounded-3xl shadow-xl p-8 space-y-6"
        >
          {/* Header */}
          <div className="text-center">
            <div className="text-3xl font-extrabold mb-2">
              <span className="bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
                SkillSwap
              </span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Welcome Back</h1>
            <p className="text-gray-500 text-sm">
              Sign in to continue your skill journey 🚀
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                required
              />
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileTap={{ scale: 0.97 }}
              className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold shadow hover:opacity-90 transition disabled:opacity-70"
            >
              {loading ? "Signing in..." : "Sign In"}
            </motion.button>
          </form>

          <p className="text-center text-sm text-gray-500">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-primary font-medium hover:underline"
            >
              Sign up for free
            </Link>
          </p>
        </motion.div>
      </div>
    </>
  );
};

export default Login;
