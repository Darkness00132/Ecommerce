import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PaypalButton from "../components/cart/PaypalButton";
import useAuthUser from "../store/useAuthUser";
import useCart from "../store/useCart.js";
import useCheckout from "../store/useCheckout.js";
import OrderSummary from "../components/cart/OrderSummary.jsx";
import { useTranslation } from "react-i18next";

const Checkout = () => {
  const { t } = useTranslation();
  const isAuth = useAuthUser((state) => state.isAuth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) navigate("/login");
  }, [isAuth]);

  const cart = useCart((state) => state.cart);
  const clearCart = useCart((state) => state.clearCart);
  const isMakingCheckout = useCheckout((state) => state.isMakingCheckout);
  const makePayment = useCheckout((state) => state.makePayment);
  const makeCheckout = useCheckout((state) => state.makeCheckout);
  const checkoutID = useCheckout((state) => state.checkoutID);
  const makeOrder = useCheckout((state) => state.makeOrder);
  const [showPaypal, setShowPaypal] = useState(false);

  const [shippingAddress, setShippingAddress] = useState({
    name: "",
    address: "",
    city: "",
    postolCode: "",
    country: "",
    phone: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    const { name, address, city, postolCode, country, phone } = shippingAddress;

    if (!name.trim())
      return toast.error(t("checkout.errors.name"), { duration: 2000 });
    if (!address.trim())
      return toast.error(t("checkout.errors.address"), { duration: 2000 });
    if (!city.trim())
      return toast.error(t("checkout.errors.city"), { duration: 2000 });
    if (!postolCode.trim() || !/^[\d٠-٩]{4,10}$/.test(postolCode))
      return toast.error(t("checkout.errors.postal"), { duration: 2000 });
    if (!country.trim())
      return toast.error(t("checkout.errors.country"), { duration: 2000 });
    if (!phone.trim() || !/^\+?[0-9\s\-()]{8,20}$/.test(phone))
      return toast.error(t("checkout.errors.phone"), { duration: 2000 });

    const success = await makeCheckout({
      shippingAddress,
      paymentMethod: "PayPal",
    });

    if (success) setShowPaypal(true);
  }

  return (
    <div className="min-h-screen bg-base-100 py-8 px-4 md:px-2">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* right - Form */}
        <div className="order-2 lg:order-1 p-0 flex flex-col justify-start">
          <h2 className="text-3xl font-bold uppercase mb-8">
            {t("checkout.title")}
          </h2>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {["name", "address", "city", "postolCode", "country", "phone"].map(
              (field) => (
                <div key={field} className="form-control w-full">
                  <label className="label font-semibold">
                    {t(`checkout.${field}`)}
                  </label>
                  <input
                    type="text"
                    placeholder={t(`checkout.${field}Placeholder`)}
                    className="input input-bordered w-full"
                    value={shippingAddress[field]}
                    required
                    onChange={(e) =>
                      setShippingAddress((prev) => ({
                        ...prev,
                        [field]: e.target.value,
                      }))
                    }
                  />
                </div>
              )
            )}

            <div className="mt-6 relative z-0">
              {showPaypal ? (
                <PaypalButton
                  amount={total}
                  onSuccess={async (details) => {
                    const paid = await makePayment({
                      paymentDetails: details,
                      orderID: details.id,
                      checkoutID,
                    });
                    if (!paid) return toast.error(t("checkout.paymentFailed"));
                    const orderID = await makeOrder(checkoutID);
                    if (orderID) {
                      clearCart();
                      navigate(`/orderConfirmation/${orderID}`);
                    }
                  }}
                  onError={(err) => {
                    console.error("Payment error:", err);
                    toast.error(t("checkout.paymentFailed"));
                  }}
                />
              ) : (
                <button
                  type="submit"
                  className={`btn btn-neutral w-full text-lg tracking-wide shadow-md hover:shadow-lg transition-all duration-200 ${
                    isMakingCheckout ? "btn-disabled" : ""
                  }`}
                  disabled={isMakingCheckout}
                >
                  {t("checkout.button")}
                </button>
              )}
            </div>
          </form>
        </div>

        {/* left - Summary */}
        <OrderSummary cart={cart} />
      </div>
    </div>
  );
};

export default Checkout;
