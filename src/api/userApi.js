// src/api/userApi.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api", // adjust if your backend is deployed
});

// --- REGISTER USER ---
export const registerUser = async (userData) => {
  const res = await API.post("/auth/register", userData);
  return res.data;
};

// --- VERIFY OTP ---
export const verifyOtp = async (otpData) => {
  const res = await API.post("/auth/verify-otp", otpData);
  return res.data;
};

// --- LOGIN USER ---
export const loginUser = async (userData) => {
  const res = await API.post("/auth/login", userData);
  return res.data;
};