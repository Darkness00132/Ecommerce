import { toast } from "react-toastify";
import axiosInstance from "../axiosInstance/axiosInstance";
import { create } from "zustand";
import i18n from "../i18n";

const useCheckout = create((set) => ({
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
      return true;
    } catch (err) {
      console.error("Checkout error:", err?.response?.data || err.message);
      toast.error(
        err?.response?.data?.message || i18n.t("useCheckout.failedStart")
      );
      return false;
    } finally {
      set({ isMakingCheckout: false });
    }
  },

  makePayment: async ({ paymentDetails, orderID, checkoutID }) => {
    try {
      await axiosInstance.put(`/checkout/${checkoutID}/pay`, {
        paymentDetails,
        orderID,
      });
      toast.success(i18n.t("useCheckout.paymentSuccess"));
      return true;
    } catch (err) {
      console.error("Payment error:", err?.response?.data || err.message);
      toast.error(
        err?.response?.data?.message || i18n.t("useCheckout.paymentFailed")
      );
      return false;
    }
  },

  makeOrder: async (checkoutID) => {
    try {
      const res = await axiosInstance.post(`/checkout/${checkoutID}/finalize`);
      toast.success(i18n.t("useCheckout.orderSuccess"));
      return res.data.orderID;
    } catch (err) {
      console.error("Order error:", err?.response?.data || err.message);
      toast.error(
        err?.response?.data?.message || i18n.t("useCheckout.orderFailed")
      );
      return null;
    }
  },
}));

export default useCheckout;
