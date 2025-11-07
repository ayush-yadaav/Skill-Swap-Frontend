// // src/api/skillsApi.js

// import axios from "axios";   // 👈 this line is required!

// const API = axios.create({
//   baseURL: "http://localhost:8080/api/skills",
//   withCredentials: true,
// });

// export const upsertSkillProfile = async (token, data) => {
//   const res = await API.post(
//     "/add",
//     data,
//     {
//       headers: { Authorization: `Bearer ${token}` },
//     }
//   );
//   return res.data;
// };


import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api/skills",
  withCredentials: true,
});

// create / update profile
export const upsertSkillProfile = async (token, data) => {
  const res = await API.post("/add", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// get all profiles (optional)
export const getAllSkillProfiles = async (token) => {
  const res = await axios.get("http://localhost:8080/api/skills", {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  });
  return res.data;
};
// get logged‑in user’s profile (the server could filter by req.user)
export const getMySkillProfile = async (token) => {
  const res = await API.get("/", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};