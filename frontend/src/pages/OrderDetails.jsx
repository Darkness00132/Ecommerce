import { useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance/axiosInstance";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationCircle,
} from "react-icons/fa";
import { toast } from "react-toastify";

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: order,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["order", id],
    queryFn: async () => {
      const res = await axiosInstance.get("/orders/" + id);
      return res.data.order;
    },
    onError: (err) => {
      toast.error(
        `Something went wrong: ${err?.response?.data?.message || err.message}`
      );
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner text-primary loading-lg"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center px-4 text-center">
        <h2 className="text-2xl font-semibold text-red-500 mb-2">
          Failed to load order
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          {error?.response?.data?.message ||
            error.message ||
            "Something went wrong."}
        </p>
        <button
          className="btn btn-sm btn-primary"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  const productTotal = order.orderItems.reduce(
    (acc, item) => acc + item.priceAtPurchaseTime * item.quantity,
    0
  );
  const discount = order.discount || 0;
  const shipping = 0;
  const total = order.totalPrice;

  return (
    <div className="p-6 w-full max-w-4xl mx-auto bg-white rounded-lg shadow-md text-sm space-y-6">
      {/* Header */}
      <div className="border-b pb-3">
        <h1 className="text-2xl font-bold mb-1">Order Receipt</h1>
        <p className="text-gray-500">
          Order ID: <span className="text-black font-mono">{order._id}</span>
        </p>
        <p className="text-gray-500">
          Created At: {format(new Date(order.createdAt), "yyyy/MM/dd hh:mm a")}
        </p>
      </div>

      {/* Shipping Info */}
      <div>
        <h2 className="font-semibold text-base mb-2">Shipping Info</h2>
        <div className="grid sm:grid-cols-2 gap-2">
          <div>
            <p>
              <strong>Name:</strong> {order.shippingAddress.name}
            </p>
            <p>
              <strong>Email:</strong> {order.user.email}
            </p>
            <p>
              <strong>Payment Method:</strong> {order.paymentMethod}
            </p>
          </div>
          <div>
            <p>
              <strong>Address:</strong> {order.shippingAddress.address},{" "}
              {order.shippingAddress.city}
            </p>
            <p>
              <strong>Postal:</strong> {order.shippingAddress.postalCode},{" "}
              {order.shippingAddress.country}
            </p>
            <p>
              <strong>Phone:</strong> {order.shippingAddress.phone}
            </p>
          </div>
        </div>
      </div>

      {/* Status Info */}
      <div className="rounded-lg p-4">
        <h2 className="font-semibold mb-2 text-base">Order Status</h2>
        <div className="space-y-1">
          <p>
            <strong>Paid At:</strong>{" "}
            {order.isPaid && order.paidAt ? (
              <span className="text-green-600 flex items-center gap-1">
                <FaCheckCircle />
                {format(new Date(order.paidAt), "yyyy/MM/dd hh:mm a")}
              </span>
            ) : (
              <span className="text-red-600 flex items-center gap-1">
                <FaTimesCircle /> Not Paid
              </span>
            )}
          </p>
          <p>
            <strong>Delivered:</strong>{" "}
            {order.isDelivered && order.deliveredAt ? (
              <span className="text-green-600 flex items-center gap-1">
                <FaCheckCircle />
                {format(new Date(order.deliveredAt), "yyyy/MM/dd hh:mm a")}
              </span>
            ) : (
              <span className="text-yellow-600 flex items-center gap-1">
                <FaExclamationCircle /> Not Delivered Yet
              </span>
            )}
          </p>
          <p>
            <strong>Status:</strong> {order.status}
          </p>
        </div>
      </div>

      {/* Order Items */}
      <div>
        <h2 className="font-semibold text-xl mb-2">Items: </h2>
        <div className="divide-y">
          {order.orderItems.map((item) => (
            <div key={item._id} className="flex justify-between py-4 gap-4">
              <div className="flex gap-3 items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg border"
                />
                <div className="space-y-1">
                  <p>
                    <strong>Name:</strong> {item.name}
                  </p>
                  <p>
                    <strong>Color:</strong> {item.color}
                  </p>
                  <p>
                    <strong>Size:</strong> {item.size}
                  </p>
                  <p>
                    <strong>Qty:</strong> {item.quantity}
                  </p>
                  <p>
                    <strong>Price:</strong> $
                    {item.priceAtPurchaseTime.toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="text-right font-semibold text-base min-w-[80px]">
                ${(item.priceAtPurchaseTime * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Totals */}
      <div className="bg-gray-100 rounded-lg p-4">
        <h2 className="font-semibold mb-3 text-base">Summary</h2>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${productTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>${shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Discount</span>
            <span>-${discount.toFixed(2)}</span>
          </div>
          <div className="border-t pt-2 flex justify-between font-bold text-base">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="text-center mt-6">
        <button
          onClick={() => navigate("/orders")}
          className="btn btn-outline btn-primary rounded-xl px-6 text-base font-semibold"
        >
          ← Back to Orders
        </button>
      </div>
    </div>
  );
};

export default OrderDetails;
