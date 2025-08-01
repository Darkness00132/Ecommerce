import { toast } from "sonner";
import axiosInstance from "../axiosInstance/axiosInstance";
import { create } from "zustand";

const useCheckout = create((set, get) => ({
  checkoutID: null,
  isMakingCheckout: false,

  makeCheckout: async ({ shippingAddress, paymentMethod = "PayPal" }) => {
    set({ isMakingCheckout: true });
    try {
      const res = await axiosInstance.post("/checkout/", {
        shippingAddress,
        paymentMethod,
      });
      set({ checkoutID: res.data.checkoutID });
      toast.success("Checkout initiated successfully ✅");
      return true;
    } catch (err) {
      console.error("Checkout error:", err?.response?.data || err.message);
      toast.error(
        err?.response?.data?.message ||
          "Failed to start checkout. Please try again."
      );
      return false;
    } finally {
      set({ isMakingCheckout: false });
    }
  },

  makePayment: async ({ paymentStatus, paymentDetails, checkoutID }) => {
    try {
      await axiosInstance.put(`/checkout/${checkoutID}/pay`, {
        paymentStatus,
        paymentDetails,
      });
      toast.success("Payment processed successfully 💳");
      return true;
    } catch (err) {
      console.error("Payment error:", err?.response?.data || err.message);
      toast.error(
        err?.response?.data?.message || "Payment failed. Please try again."
      );
      return false;
    }
  },

  makeOrder: async (checkoutID) => {
    try {
      const res = await axiosInstance.post(`/checkout/${checkoutID}/finalize`);
      toast.success("Order placed successfully 🎉");
      return res.data.orderID;
    } catch (err) {
      console.error("Order error:", err?.response?.data || err.message);
      toast.error(
        err?.response?.data?.message ||
          "Failed to place order. Please try again."
      );
      return null;
    }
  },
}));

export default useCheckout;
