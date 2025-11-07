import axios from "axios";

const API = axios.create({
  baseURL: "https://skill-sqap-backend.vercel.app/api/match",   // ✅ correct path
  withCredentials: true,
});

// get all skill profiles
export const getAllProfiles = async (token) => {
  const res = await axios.get("https://skill-sqap-backend.vercel.app/api/skills", {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  });
  return res.data;
};

// filter search
export const filterProfiles = async (token, { skill, location }) => {
  const params = new URLSearchParams();
  if (skill) params.append("skill", skill);
  if (location) params.append("location", location);

  const res = await API.get(`/filter?${params.toString()}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.matches || [];
};