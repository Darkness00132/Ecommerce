import { IoMdClose } from "react-icons/io";
import CartContext from "./CartContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const CartDrawer = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="drawer drawer-end z-50">
      <input id="cart-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content"></div>

      <div className="drawer-side">
        <label htmlFor="cart-drawer" className="drawer-overlay"></label>

        <div className="w-[26rem] max-w-full h-full flex flex-col bg-base-100 text-base-content border-l border-base-300 shadow-xl">
          {/* Header with close icon */}
          <div className="flex justify-between items-center px-5 py-4 border-b border-base-200">
            <h2 className="text-lg font-semibold tracking-tight">
              {t("cartDrawer.title")}
            </h2>
            <label htmlFor="cart-drawer" className="cursor-pointer">
              <IoMdClose
                size={26}
                className="text-base-content hover:text-error transition"
              />
            </label>
          </div>

          {/* Cart Items */}
          <div className="flex-grow px-5 py-4 overflow-y-auto">
            <CartContext />
          </div>

          {/* Footer */}
          <div className="px-5 py-4 border-t border-base-300 bg-base-100">
            <button
              className="btn btn-neutral w-full rounded-xl tracking-wide text-base font-semibold"
              onClick={() => {
                document.getElementById("cart-drawer").checked = false;
                navigate("/checkout");
              }}
            >
              {t("cartDrawer.checkoutButton")}
            </button>
            <p className="text-xs text-center text-base-content opacity-60 mt-2">
              {t("cartDrawer.note")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
