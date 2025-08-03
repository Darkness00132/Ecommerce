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
      role: null,
      setCheck: (user) => {
        if (user) {
          const isAdmin = ["admin", "superAdmin", "owner"].includes(user.role);
          if (isAdmin) {
            set({ role: user.role });
          }
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
          if (isAdmin) {
            set({ role: user.role });
          }
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
          if (isAdmin) {
            set({ role: user.role });
          }
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
          set({ user: null, isAuth: false, isAdmin: false, role: null });
          toast.success(res.data.message || "Logged out successfully.");
        } catch (e) {
          toast.error(
            e?.response?.data?.message || "Logout failed. Please try again."
          );
          console.error("Logout error:", e?.response?.data || e.message);
        } finally {
          set({ isLoggingOut: false });
        }
      },
      isAddingUser: false,
      addUser: async ({ name, email, password, role }) => {
        set({ isAddingUser: true });
        try {
          const response = await axiosInstance.post("/admin/", {
            name,
            email,
            password,
            role,
          });
          toast.success(response.data.message || "Added Successfully");
        } catch (e) {
          toast.error(
            e?.response?.data?.message || "Failed to add user try again later"
          );
          console.error("Add User error:", e?.response?.data || e.message);
        } finally {
          set({ isAddingUser: false });
        }
      },
      isUpdatingUser: false,
      updateUser: async (user) => {
        set({ isUpdatingUser: true });
        try {
          const response = await axiosInstance.put("/admin/", user);
          toast.success(response.data.message || "Updated Succefully");
        } catch (e) {
          toast.error(
            e?.response?.data?.message ||
              "Failed to update user try again later"
          );
          console.error("Update User error:", e?.response?.data || e.message);
        } finally {
          set({ isUpdatingUser: false });
        }
      },
      isDeletingUser: false,
      deleteUser: async (email) => {
        set({ isDeletingUser: true });
        try {
          const response = await axiosInstance.delete("/admin/", {
            data: { email },
          });
          toast.success(response.data.message || "Deleted Succefully");
        } catch (e) {
          toast.error(
            e?.response?.data?.message ||
              "Failed to delete user try again later"
          );
          console.error("Delete User error:", e?.response?.data || e.message);
        } finally {
          set({ isDeletingUser: false });
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
        role: state.role,
      }),
    }
  )
);

export default useAuthUser;
