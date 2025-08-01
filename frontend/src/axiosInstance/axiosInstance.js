import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const csrfToken = Cookies.get("csrfToken"); // assume frontend stores token itself
  if (csrfToken) config.headers["X-CSRF-Token"] = csrfToken;
  return config;
});

export default axiosInstance;
