import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { verifyOtp } from "../api/userApi.js";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const email = localStorage.getItem("pendingEmail");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      alert("No email found. Please register again.");
      navigate("/register");
      return;
    }

    setLoading(true);
    try {
      const res = await verifyOtp({ email, otp });
      alert(res.message || "Account verified successfully!");
      localStorage.removeItem("pendingEmail");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/20 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
            SkillSwap
          </h1>
          <h2 className="text-xl font-semibold mt-2">Verify Your Email</h2>
          <p className="text-sm text-muted-foreground">
            Enter the OTP sent to <b>{email}</b>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP code"
            className="w-full text-center tracking-[8px] text-lg font-semibold py-3 border rounded-xl focus:border-primary outline-none"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold hover:opacity-90 transition"
          >
            {loading ? "Verifying..." : "Verify Account"}
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Didn’t receive OTP?{" "}
          <Link to="/register" className="text-primary font-medium hover:underline">
            Try signing up again
          </Link>
        </p>
      </div>
    </div>
  );
};

export default VerifyOtp;