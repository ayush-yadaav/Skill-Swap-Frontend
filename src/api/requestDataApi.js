import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api/request",
  withCredentials: true,
});

// send a new skill‑swap request
export const sendRequest = async (token, data) => {
  const res = await API.post("/send", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// update request status (accept | reject | completed)
export const updateRequestStatus = async (token, requestId, status) => {
  const res = await API.put(
    `/${requestId}/status`,
    { status },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

// get all requests for current user
export const getUserRequests = async (token) => {
  const res = await API.get("/all", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// optional – for direct check between users
export const trackRequestBetweenUsers = async (token, userId) => {
  const res = await API.get(`/track/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};