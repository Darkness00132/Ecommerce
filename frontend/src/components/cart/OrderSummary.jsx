import { useTranslation } from "react-i18next";

const OrderSummary = ({ cart }) => {
  const { t } = useTranslation();

  const subtotal = cart?.products.reduce(
    (acc, item) => acc + item.priceAtPurchaseTime * item.quantity,
    0
  );
  const total = subtotal;

  return (
    <div className="order-1 lg:order-2 bg-base-100 shadow-xl rounded-2xl p-8 flex flex-col">
      <h2 className="text-3xl font-bold mb-8 uppercase">
        {t("orderSummary.title", "Order Summary")}
      </h2>

      <div className="space-y-5 overflow-y-auto flex-grow">
        {cart?.products.map((item) => {
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
                  {t("orderSummary.size", "Size")}: {item.size} |{" "}
                  {t("orderSummary.color", "Color")}: {item.color}
                </span>
                <div className="text-sm text-gray-600 grid grid-cols-2 gap-x-2">
                  <span>
                    {t("orderSummary.pricePerUnit", "Price per unit")}:
                  </span>
                  <span>${item.priceAtPurchaseTime}</span>
                  <span>{t("orderSummary.quantity", "Quantity")}:</span>
                  <span>{item.quantity}</span>
                  <span className="font-semibold text-black">
                    {t("orderSummary.total", "Total")}:
                  </span>
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
          <span className="font-medium">
            {t("orderSummary.subtotal", "Subtotal")}:
          </span>
          <span>${subtotal}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">
            {t("orderSummary.shipping", "Shipping")}:
          </span>
          <span>$00.00</span>
        </div>

        <div className="flex justify-between text-lg font-bold pt-2 border-t mt-3">
          <span>{t("orderSummary.total", "Total")}:</span>
          <span>${total}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
