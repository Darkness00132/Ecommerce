import { toast } from "sonner";
import axiosInstance from "../axiosInstance/axiosInstance";

import { create } from "zustand";

const useCheckout = create((set, get) => ({
  checkoutID: null,
  isMakingCheckout: false,
  makeCheckout: async ({ shippingAddress, paymentMethod = "PayPal" }) => {
    set({ isMakingCheckout: true });
    try {
      const response = await axiosInstance.post("/checkout/", {
        shippingAddress,
        paymentMethod,
      });
      set({ checkoutID: response.data.checkoutID });
      return true;
    } catch (e) {
      toast.error("Something went wrong");
      if (e?.response?.data?.message) {
        toast.error(`Something went wrong: ${e.response.data.message}`);
      }
      return false;
    } finally {
      set({ isMakingCheckout: false });
    }
  },
  makePayment: async ({ paymentStatus, paymentDetails, checkoutID }) => {
    try {
      console.log(checkoutID);
      await axiosInstance.put(`/checkout/${checkoutID}/pay`, {
        paymentStatus,
        paymentDetails,
      });
      toast.success("Payment successful!");
      return true;
    } catch (e) {
      toast.error("Something went wrong");
      console.log(e);
      if (e?.response?.data?.message) {
        toast.error(`Something went wrong: ${e.response.data.message}`);
      }
      return false;
    }
  },
  makeOrder: async (checkoutID) => {
    try {
      console.log(checkoutID);
      const response = await axiosInstance.post(
        `/checkout/${checkoutID}/finalize`
      );
      return response.data.orderID;
    } catch (e) {
      toast.error("Something went wrong");
      console.log(e);
      if (e?.response?.data?.message) {
        toast.error(`Something went wrong: ${e.response.data.message}`);
      }
      return null;
    }
  },
}));

export default useCheckout;
