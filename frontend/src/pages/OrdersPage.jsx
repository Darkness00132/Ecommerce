import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axiosInstance from "../axiosInstance/axiosInstance";

const OrdersPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { data: orders, isLoading } = useQuery({
    queryKey: ["order", "customer"],
    queryFn: async () => {
      const response = await axiosInstance.get("/orders/myorders");
      return response.data.orders;
    },
  });

  if (isLoading)
    return (
      <p className="text-center py-10 min-h-screen">{t("orders.loading")}</p>
    );

  if (!orders || orders.length === 0)
    return (
      <p className="text-center py-10 text-gray-500 min-h-screen">
        {t("orders.noOrders")}
      </p>
    );

  return (
    <div className="p-4 max-w-4xl mx-auto space-y-4 min-h-screen">
      {orders.map((order) => (
        <div
          key={order._id}
          onClick={() => navigate(`/orders/${order._id}`)}
          className="p-4 border rounded-xl bg-white shadow-sm hover:shadow-md cursor-pointer transition"
        >
          <div className="flex items-center gap-4">
            <img
              src={order.orderItems[0].image}
              alt={order.orderItems[0].name}
              className="w-16 h-16 object-cover rounded-md border"
            />
            <div className="flex-1 space-y-1">
              <p className="text-sm text-gray-600">
                <strong>{t("orders.order")}:</strong> #{order._id.slice(-6)}
              </p>
              <p className="text-sm text-gray-600">
                <strong>{t("orders.date")}:</strong>{" "}
                {format(new Date(order.createdAt), "yyyy-MM-dd / hh:mm a")}
              </p>
              <p className="text-sm text-gray-600">
                <strong>{t("orders.to")}:</strong>{" "}
                {order.shippingAddress
                  ? `${order.shippingAddress.city}, ${order.shippingAddress.country}`
                  : "N/A"}
              </p>
              <p className="text-sm text-gray-600">
                <strong>{t("orders.items")}:</strong> {order.orderItems.length}{" "}
                &nbsp;|&nbsp;
                <strong>{t("orders.total")}:</strong> $
                {order.totalPrice.toFixed(2)}
              </p>
            </div>
            <span
              className={`text-sm font-semibold rounded-full px-3 py-1 ${
                order.isPaid
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {order.isPaid ? t("orders.paid") : t("orders.pending")}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrdersPage;
