import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PaypalButton from "./PaypalButton.jsx";
import useAuthUser from "../../store/useAuthUser.js";
import useCart from "../../store/useCart.js";
import useCheckout from "../../store/useCheckout.js";
import { toast } from "sonner";

const Checkout = () => {
  const isAuth = useAuthUser((state) => state.isAuth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuth) navigate("/login");
  }, [isAuth]);

  const cart = useCart((state) => state.cart);
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

  const subtotal = cart.products.reduce(
    (acc, item) => acc + item.priceAtPurchaseTime * item.quantity,
    0
  );
  const total = subtotal;

  async function handleSubmit(e) {
    e.preventDefault();
    const { name, address, city, postolCode, country, phone } = shippingAddress;

    if (!name.trim())
      return toast.error("Please enter your full name.", { duration: 2000 });
    if (!address.trim())
      return toast.error("Please enter your address.", { duration: 2000 });
    if (!city.trim())
      return toast.error("Please enter your city.", { duration: 2000 });
    if (!postolCode.trim() || !/^\d{4,10}$/.test(postolCode))
      return toast.error("Please enter a valid postal code.", {
        duration: 2000,
      });
    if (!country.trim())
      return toast.error("Please enter your country.", { duration: 2000 });
    if (!phone.trim() || !/^\+?[0-9\s\-()]{8,20}$/.test(phone))
      return toast.error("Please enter a valid phone number.", {
        duration: 2000,
      });

    const success = await makeCheckout({
      shippingAddress,
      paymentMethod: "PayPal",
    });

    if (success) setShowPaypal(true);
  }

  return (
    <div className="min-h-screen bg-base-100 py-8 px-4 md:px-2">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* right - Plain Form Without Container */}
        <div className="order-2 lg:order-1 p-0 flex flex-col justify-start">
          <h2 className="text-3xl font-bold mb-8 uppercase">Checkout</h2>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {[
              { label: "Full Name", field: "name", placeholder: "John Doe" },
              {
                label: "Address",
                field: "address",
                placeholder: "123 Main St",
              },
              { label: "City", field: "city", placeholder: "Cairo" },
              {
                label: "Postal Code",
                field: "postolCode",
                placeholder: "12345",
              },
              { label: "Country", field: "country", placeholder: "Egypt" },
              { label: "Phone", field: "phone", placeholder: "+20123456789" },
            ].map(({ label, field, placeholder }) => (
              <div key={field} className="form-control w-full">
                <label className="label font-semibold">{label}</label>
                <input
                  type="text"
                  placeholder={placeholder}
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
            ))}
            <div className="mt-6 relative z-0">
              {showPaypal ? (
                <PaypalButton
                  amount={total}
                  onSuccess={async (details) => {
                    try {
                      const paid = await makePayment({
                        paymentStatus: details.status,
                        paymentDetails: details,
                        checkoutID,
                      });
                      if (!paid) return toast.error("Payment failed.");
                      const orderID = await makeOrder(checkoutID);
                      if (!orderID)
                        return toast.error("Order creation failed.");
                      navigate(`/orderConfirmation/${orderID}`);
                    } catch (err) {
                      console.error("Payment/onSuccess error:", err);
                      toast.error(
                        "Something went wrong while processing your order."
                      );
                    }
                  }}
                  onError={(err) => {
                    console.error("Payment error:", err);
                    toast.error(
                      "Payment failed. Please try again or use a different method."
                    );
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
                  Continue to Payment
                </button>
              )}
            </div>
          </form>
        </div>

        {/* left - Order Summary (With Card/Shadow) */}
        <div className="order-1 lg:order-2 bg-base-100 shadow-xl rounded-2xl p-8 flex flex-col">
          <h2 className="text-3xl font-bold mb-8 uppercase">Order Summary</h2>

          <div className="space-y-5 overflow-y-auto flex-grow">
            {cart.products.map((item) => {
              const itemTotal = item.priceAtPurchaseTime * item.quantity;
              return (
                <div
                  key={item._id}
                  className="flex gap-4 items-start border-b pb-4 last:border-b-0"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-md object-cover"
                  />
                  <div className="flex flex-col gap-1 w-full">
                    <span className="font-semibold">{item.name}</span>
                    <span className="text-sm text-gray-500">
                      Size: {item.size} | Color: {item.color}
                    </span>
                    <div className="text-sm text-gray-600 grid grid-cols-2 gap-x-2">
                      <span>Price per unit:</span>
                      <span>${item.priceAtPurchaseTime}</span>
                      <span>Quantity:</span>
                      <span>{item.quantity}</span>
                      <span className="font-semibold text-black">Total:</span>
                      <span className="font-semibold text-primary">
                        ${itemTotal}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="divider my-6" />
          <div className="text-sm space-y-3">
            <div className="flex justify-between">
              <span className="font-medium">Subtotal:</span>
              <span>${subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Shipping:</span>
              <span>FREE</span>
            </div>

            <div className="flex justify-between text-lg font-bold pt-2 border-t mt-3">
              <span>Total:</span>
              <span>${total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
