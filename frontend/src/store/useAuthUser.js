import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { toast } from "sonner";
import axiosInstance from "../axiosInstance/axiosInstance";

const useAuthUser = create(
  persist(
    (set) => ({
      user: null,
      isAuth: false,
      isAdmin: false,

      setCheck: (user) => {
        if (user) {
          const isAdmin = ["admin", "superAdmin", "owner"].includes(user.role);
          set({ user, isAuth: true, isAdmin });
        }
      },

      isSigningup: false,
      signup: async ({ name, email, password }) => {
        set({ isSigningup: true });
        try {
          const res = await axiosInstance.post("/users/signup", {
            name,
            email,
            password,
          });
          const user = res.data.user;
          const isAdmin = ["admin", "superAdmin", "owner"].includes(user.role);
          set({ user, isAuth: true, isAdmin });
          toast.success(`Welcome aboard, ${user.name}! 🎉`);
          return true;
        } catch (err) {
          toast.error(
            err?.response?.data?.message || "Signup failed. Please try again."
          );
          console.error("Signup error:", err?.response?.data || err.message);
          return false;
        } finally {
          set({ isSigningup: false });
        }
      },

      isLoggign: false,
      login: async ({ email, password }) => {
        set({ isLogging: true });
        try {
          const res = await axiosInstance.post("/users/login", {
            email,
            password,
          });
          const user = res.data.user;
          const isAdmin = ["admin", "superAdmin", "owner"].includes(user.role);
          set({ user, isAuth: true, isAdmin });
          toast.success(`Welcome back, ${user.name}! 👋`);
          return true;
        } catch (err) {
          toast.error(
            err?.response?.data?.message ||
              "Login failed. Please check your credentials."
          );
          console.error("Login error:", err?.response?.data || err.message);
          return false;
        } finally {
          set({ isLogging: false });
        }
      },

      isLoggingOut: false,
      logout: async () => {
        set({ isLoggingOut: true });
        try {
          const res = await axiosInstance.delete("/users/logout");
          set({ user: null, isAuth: false, isAdmin: false });
          toast.success(res.data.message || "Logged out successfully.");
        } catch (err) {
          toast.error(
            err?.response?.data?.message || "Logout failed. Please try again."
          );
          console.error("Logout error:", err?.response?.data || err.message);
        } finally {
          set({ isLoggingOut: false });
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        user: state.user,
        isAuth: state.isAuth,
        isAdmin: state.isAdmin,
      }),
    }
  )
);

export default useAuthUser;
