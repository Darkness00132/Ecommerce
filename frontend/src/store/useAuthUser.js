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
          const response = await axiosInstance.post("/users/signup", {
            name,
            email,
            password,
          });
          const user = response.data.user;
          const isAdmin = ["admin", "superAdmin", "owner"].includes(user.role);
          set({ user, isAuth: true, isAdmin });
          toast.success("Welcome to our family! " + user.name);
          return true;
        } catch (error) {
          toast.error(error?.response?.data?.error || "Failed to sign up");
          console.log(error?.response?.data?.error);
          return false;
          return { success: false };
        } finally {
          set({ isSigningup: false });
        }
      },

      isLoggin: false,
      login: async ({ email, password }) => {
        set({ isLoggin: true });
        try {
          const response = await axiosInstance.post("/users/login", {
            email,
            password,
          });
          const user = response.data.user;
          const isAdmin = ["admin", "superAdmin", "owner"].includes(user.role);
          set({ user, isAuth: true, isAdmin });
          toast.success("welcome back to our family! " + user.name);
          return true;
        } catch (error) {
          toast.error(error?.response?.data?.error || "Failed to login");
          console.log(error?.response?.data?.error);
          return false;
        } finally {
          set({ isLoggin: false });
        }
      },

      isLoggingOut: false,
      logout: async () => {
        set({ isLoggingOut: true });
        try {
          const response = await axiosInstance.delete("/users/logout");
          set({ user: null, isAuth: false, isAdmin: false });
          toast.success(response.data.message);
        } catch (error) {
          toast.error(error?.response?.data?.error || "Failed to logout");
          console.log(error?.response?.data?.error);
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
