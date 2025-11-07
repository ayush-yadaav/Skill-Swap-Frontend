import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api/users",
  withCredentials: true,
});

// get a user profile by id
export const getUserProfile = async (token, userId) => {
  const res = await API.get(`/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// update the logged‑in user
export const updateUserProfile = async (token, data) => {
  const res = await API.put("/update", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};