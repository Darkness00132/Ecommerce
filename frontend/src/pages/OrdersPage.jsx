import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance/axiosInstance";

const OrdersPage = () => {
  const navigate = useNavigate();
  const { data: orders, isLoading } = useQuery({
    queryKey: ["order", "customer"],
    queryFn: async () => {
      const response = await axiosInstance.get("/orders/myorders");
      return response.data.orders;
    },
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-2 sm:p-4 min-h-screen">
      <div className="overflow-x-auto border border-base-100 rounded-xl shadow-sm bg-base-100">
        <table className="table w-full text-sm">
          <thead className="bg-base-200 text-base-content">
            <tr>
              <th>Image</th>
              <th>Order ID</th>
              <th>Date</th>
              <th>Shipping</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order._id}
                  className="hover:bg-base-100/50"
                  onClick={() => navigate(`/orders/${order._id}`)}
                >
                  <td>
                    <img
                      src={order.orderItems[0].image}
                      alt={order.orderItems[0].name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                  </td>
                  <td className="font-medium whitespace-nowrap">
                    #{order._id}
                  </td>
                  <td>
                    {format(new Date(order.createdAt), "yyyy-MM-dd / hh:mm a")}
                  </td>
                  <td>
                    {order.shippingAddress
                      ? `${order.shippingAddress.city}, ${order.shippingAddress.country}`
                      : "N/A"}
                  </td>
                  <td>{order.orderItems.length}</td>
                  <td>${order.totalPrice}</td>
                  <td>
                    <span
                      className={`badge text-xs font-semibold px-3 py-1 ${
                        order.isPaid ? "badge-success" : "badge-warning"
                      }`}
                    >
                      {order.isPaid ? "Paid" : "Pending"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-8 text-gray-500">
                  You have no orders yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersPage;
