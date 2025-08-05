import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { toast } from "sonner";
import axiosInstance from "../axiosInstance/axiosInstance";

const useAuthUser = create(
  persist(
    (set, get) => ({
      cart: null,
      setCart: (cart) => {
        set({ cart });
      },
      guestID: null,
      isAddingProduct: false,
      addToCart: async ({ productID, quantity, name, size, color }) => {
        set({ isAddingProduct: true });
        const guestID = get().guestID || "guest_" + Date.now();
        try {
          const response = await axiosInstance.post("/cart/", {
            productID,
            guestID,
            name,
            quantity,
            size,
            color,
          });
          const cart = response.data.cart;
          set({ cart, guestID: cart.guestID || guestID });
          toast.success("Product added to cart!");
        } catch (e) {
          toast.error("Failed to add to cart.");
          console.error("Remove error:", e?.response?.data || e.message);
        } finally {
          set({ isAddingProduct: false });
        }
      },
      removingProduct: false,
      removeProduct: async ({ productID, size, color }) => {
        set({ removingProduct: true });
        try {
          const guestID = get().guestID;
          const params = new URLSearchParams({
            productID,
            guestID,
            color,
            size,
          });
          const response = await axiosInstance.delete(`/cart/?${params}`);
          set({ cart: response.data.cart });
        } catch (e) {
          toast.error("Failed to remove item. Please try again.");
          console.error(
            "Remove product error:",
            e?.response?.data || e.message
          );
        } finally {
          set({ removingProduct: false });
        }
      },
      isUpdatingQuantity: false,
      updateQuantity: async ({ productID, quantity, color, size }) => {
        set({ isUpdatingQuantity: true });
        try {
          const guestID = get().guestID;
          const params = new URLSearchParams({
            productID,
            guestID,
            color,
            size,
            quantity,
          });
          const response = await axiosInstance.put(`/cart/?${params}`);
          set({ cart: response.data.cart });
        } catch (e) {
          toast.error("Couldn't update quantity. Please try again.");
          console.error(
            "Update quantity error:",
            e?.response?.data || e.message
          );
        } finally {
          set({ isUpdatingQuantity: false });
        }
      },
      mergeCart: async () => {
        try {
          const guestID = get().guestID;
          const response = await axiosInstance.post("/cart/merge", { guestID });
          set({ cart: response.data.cart });
        } catch (e) {
          console.error("Merge error:", e?.response?.data || e.message);
        }
      },
      clearCart: () => {
        set({ cart: null, guestID: null });
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        guestID: state.guestID,
        cart: state.cart,
      }),
    }
  )
);

export default useAuthUser;
