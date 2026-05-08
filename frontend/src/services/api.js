import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000",
});

// Upload file and get parsed data
export const uploadFile = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return API.post("/upload/", formData);
};

// Upload file and get full dashboard data
export const generateDashboard = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return API.post("/dashboard/", formData);
};