import axios from "axios";
import useAuthUser from "../store/useAuthUser";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized = token expired or invalid
      useAuthUser.getState().clearUser();
      return Promise.reject(error);
    }
  }
);

export default axiosInstance;
