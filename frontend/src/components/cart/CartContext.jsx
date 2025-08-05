import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { RiDeleteBin3Line } from "react-icons/ri";
import { FiShoppingCart } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import axiosInstance from "../../axiosInstance/axiosInstance";
import useCart from "../../store/useCart.js";
import useAuthUser from "../../store/useAuthUser.js"; // ✅ تصحيح الاستدعاء

const CartContext = () => {
  const { t } = useTranslation();

  const guestID = useCart((state) => state.guestID);
  const cart = useCart((state) => state.cart);
  const setCart = useCart((state) => state.setCart);
  const removeProduct = useCart((state) => state.removeProduct);
  const removingProduct = useCart((state) => state.removingProduct);
  const isUpdatingQuantity = useCart((state) => state.isUpdatingQuantity);
  const updateQuantity = useCart((state) => state.updateQuantity);

  const isAuth = useAuthUser((state) => state.isAuth);

  const { isLoading, refetch } = useQuery({
    queryKey: ["cart", isAuth, guestID],
    queryFn: async () => {
      const response = await axiosInstance.get("/cart/?guestID=" + guestID);
      const cart = response.data.cart;
      setCart(cart);
      return cart.products;
    },
    onError: (e) => {
      console.error(e);
      toast.error(e?.response?.data?.message || t("cart.error"));
    },
    enabled: isAuth || typeof guestID === "string",
    retryDelay: 5000,
  });

  useEffect(() => {
    if (isAuth && guestID) {
      refetch();
    }
  }, [isAuth, guestID, refetch]);

  if (isLoading) {
    return (
      <div className="alert alert-info flex items-center gap-2">
        <span className="loading loading-spinner loading-sm"></span>
        <span>{t("cart.loading")}</span>
      </div>
    );
  }

  if (!cart || cart.products?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-60 text-center space-y-3">
        <FiShoppingCart size={48} className="text-base-content/60" />
        <p className="text-lg font-semibold text-base-content/80">
          {t("cart.empty")}
        </p>
        <p className="text-sm text-base-content/60">{t("cart.addToStart")}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {cart.products.map((item) => (
        <div
          key={item._id}
          className="flex justify-between items-center border p-4 rounded-lg"
        >
          <div>
            <h3 className="font-bold">{item.product.name}</h3>
            <p>
              {t("cart.quantity")}: {item.quantity}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => updateQuantity(item._id, item.quantity + 1)}
              disabled={isUpdatingQuantity}
              className="btn btn-sm btn-outline"
            >
              +
            </button>
            <button
              onClick={() => updateQuantity(item._id, item.quantity - 1)}
              disabled={isUpdatingQuantity || item.quantity <= 1}
              className="btn btn-sm btn-outline"
            >
              -
            </button>
            <button
              onClick={() => removeProduct(item._id)}
              disabled={removingProduct}
              className="btn btn-sm btn-error"
            >
              <RiDeleteBin3Line />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartContext;
