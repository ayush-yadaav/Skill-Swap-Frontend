import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
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
      alert(res.message || "Login successful!");
      window.dispatchEvent(new Event("userChange"));

      if (res.user?.hasSkills) navigate("/dashboard");
      else navigate("/skills-setup");
    } catch (err) {
      alert(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <BeforeLoginNavbar /> {/* ✅ Added navbar here */}

      <div className="min-h-screen flex items-center justify-center bg-muted/20 px-4 pt-20">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-lg p-8 space-y-6">
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">
              <span className="bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
                SkillSwap
              </span>
            </div>
            <h1 className="text-2xl font-bold">Welcome Back</h1>
            <p className="text-muted-foreground text-sm">
              Sign in to continue your skill journey
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary outline-none"
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
                className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary outline-none"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold hover:opacity-90 transition"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-primary font-medium hover:underline"
            >
              Sign up for free
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
