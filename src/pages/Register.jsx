import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, MapPin, Lock } from "lucide-react";
import { registerUser } from "../api/userApi.js";
import BeforeLoginNavbar from "../components/Navbar/BeforeLoginNavbar.jsx";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await registerUser(formData);
      alert(res.message || "OTP sent to your email!");
      // store email in localStorage (for OTP verification use)
      localStorage.setItem("pendingEmail", formData.email);
      navigate("/verify-otp");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <>
<BeforeLoginNavbar />


    <div className="min-h-screen flex items-center justify-center bg-muted/20 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
            SkillSwap
          </h1>
          <h2 className="text-xl font-semibold mt-2">Create Your Account</h2>
          <p className="text-sm text-muted-foreground">Start exchanging skills today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary outline-none"
              required
            />
          </div>

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
            <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
            <input
              type="text"
              name="location"
              placeholder="Location (e.g. New York, USA)"
              value={formData.location}
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
            {loading ? "Sending OTP..." : "Create Account"}
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
    </>
  );
};

export default Register;