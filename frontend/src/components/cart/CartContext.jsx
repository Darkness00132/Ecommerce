import { RiDeleteBin3Line } from "react-icons/ri";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../axiosInstance/axiosInstance";
import useCart from "../../store/useCart.js";
import useAuthUser from "../../store/useCart.js";
import { FiShoppingCart } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

const CartContext = () => {
  const { t } = useTranslation();
  const guestID = useCart((state) => state.guestID);
  const setCart = useCart((state) => state.setCart);
  const cart = useCart((state) => state.cart);
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
      console.log(e);
      toast.error(e?.response?.data?.message || t("cart.error"));
    },
    enabled: isAuth || typeof guestID === "string",
    retryDelay: 5000,
  });

  useEffect(() => {
    if (isAuth) {
      refetch();
    }
  }, [isAuth]);

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
      {cart?.products?.map((cartProduct, index) => (
        <div
          key={index}
          className="flex border border-base-200 rounded-xl shadow-sm overflow-hidden"
        >
          <div className="w-[120px] flex-shrink-0">
            <img
              src={cartProduct.image}
              alt={cartProduct.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 p-4 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-base font-semibold">{cartProduct.name}</h3>
                <div className="mt-2 text-sm text-base-content/70 space-y-1">
                  <p>
                    {t("cart.size")}: {cartProduct.size}
                  </p>
                  <p>
                    {t("cart.color")}: {cartProduct.color}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-sm font-bold">
                  ${cartProduct.priceAtPurchaseTime}
                </p>
                <button
                  className={`text-error mt-2 hover:text-error-content ${
                    removingProduct ? "opacity-50 pointer-events-none" : ""
                  }`}
                  onClick={async () => {
                    await removeProduct({
                      productID: cartProduct.product,
                      size: cartProduct.size,
                      color: cartProduct.color,
                    });
                  }}
                  disabled={removingProduct}
                >
                  <RiDeleteBin3Line size={22} />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-4">
              <button
                className={`btn btn-xs btn-outline ${
                  isUpdatingQuantity ? "btn-disabled" : ""
                }`}
                disabled={isUpdatingQuantity}
                onClick={async () => {
                  if (cartProduct.quantity === 1) return;
                  await updateQuantity({
                    productID: cartProduct.product,
                    size: cartProduct.size,
                    color: cartProduct.color,
                    quantity: -1,
                  });
                }}
              >
                -
              </button>
              <span className="text-sm font-medium">
                {cartProduct.quantity}
              </span>
              <button
                className={`btn btn-xs btn-outline ${
                  isUpdatingQuantity ? "btn-disabled" : ""
                }`}
                disabled={isUpdatingQuantity}
                onClick={async () => {
                  await updateQuantity({
                    productID: cartProduct.product,
                    size: cartProduct.size,
                    color: cartProduct.color,
                    quantity: +1,
                  });
                }}
              >
                +
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartContext;
