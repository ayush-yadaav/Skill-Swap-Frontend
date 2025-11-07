import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

// import Navbar from "./components/Navbar";  
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";
import VerifyOtp from "./pages/VerifyOtp";
import Dashboard from "./pages/Dashboard";
import SkillsSetup from "./pages/SkillsSetup";
import Discover from "./pages/Discover";
import SkillManager from "./pages/SkillManager";
import RequestsPage from "./pages/RequestsPage";
import ProfilePage from "./pages/ProfilePage";
import ViewProfile from "./pages/ViewProfile";
import MessagesPage from "./pages/MessagesPage";
import AfterLoginNavbar from "./components/Navbar/AfterLoginNavbar";

// ✅ ProtectedRoute wrapper
// const ProtectedRoute = ({ children }) => {
//   const user = localStorage.getItem("user");
//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }
//   return children;
// };

const ProtectedRoute = ({ children }) => {
  try {
    const stored = JSON.parse(localStorage.getItem("user"));

    const token = stored?.token;

    // if no data OR token missing, send back to login
    if (!stored || !token) {
      return <Navigate to="/login" replace />;
    }

    return children;
  } catch (err) {
    // invalid JSON, treat as logged out
    return <Navigate to="/login" replace />;
  }
};

function App() {
  return (
    <div className="bg-background min-h-screen ">
      {/* 🌟 Navbar dikhega har route pe */}




      {/* thoda top padding so content navbar niche dikhe */}
      <div className="pt-20">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/login" element={<Login />} />

          {/* ✅ Protected dashboard route */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <AfterLoginNavbar />
                <Dashboard />
              </ProtectedRoute>
            }
          />
          {/* skill setuop after login */}
          <Route
            path="/skills-setup"
            element={
              <ProtectedRoute>
                <SkillsSetup />
              </ProtectedRoute>
            }
          />
          <Route path="/discover" element={
            <ProtectedRoute>
              <Discover />
            </ProtectedRoute>
          } />
          <Route path="/skill-manage" element={
            <ProtectedRoute>
              <SkillManager />
            </ProtectedRoute>
          } />
          <Route path="/request-data" element={
            <ProtectedRoute>
              <RequestsPage />
            </ProtectedRoute>
          } />

          <Route
            path="/messages"
            element={
              <ProtectedRoute>
                <MessagesPage />
              </ProtectedRoute>
            }
          />
          <Route path="/user-profile" element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } />

          {/* 🔍 view-only profile for any user */}
          <Route
            path="/user/:id"
            element={
              <ProtectedRoute>  {/* optional — remove if you want visitors to see */}
                <ViewProfile />
              </ProtectedRoute>
            }
          />

        </Routes>
      </div>
    </div>
  );
}

export default App;