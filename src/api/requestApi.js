import axios from "axios";

const API = axios.create({
  baseURL: "https://skill-sqap-backend.vercel.app/api",
  withCredentials: true,
});

// Get all requests for the logged-in user
export const getUserRequests = async (token) => {
  const res = await API.get("/request/all", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Get suggested matches
export const getSuggestedMatches = async (token) => {
  const res = await API.get("/match/suggested", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// ✅ Send a new skill exchange request
export const sendSkillRequest = async (token, receiverId, offeredSkill, requestedSkill) => {
  const res = await API.post(
    "/request/send",
    { receiverId, offeredSkill, requestedSkill },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
};