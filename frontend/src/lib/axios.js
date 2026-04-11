import axios from "axios";

const axiosInstance = axios.create({
  // Use the Vite dev proxy in development so cookie-based auth works cleanly.
  baseURL: import.meta.env.VITE_API_URL || "/api",
  withCredentials: true, // send cookies to the server
});

export default axiosInstance;
