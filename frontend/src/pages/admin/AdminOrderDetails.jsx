import { useState } from "react";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationCircle,
} from "react-icons/fa";
import { format } from "date-fns";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import axiosInstance from "../../axiosInstance/axiosInstance";
import { toast } from "sonner";
import { queryClient } from "../../main.jsx";

const AdminOrderDetails = () => {
  const [status, setStatus] = useState();
  const { id } = useParams();
  const { data: order, isLoading } = useQuery({
    queryKey: ["order", id],
    queryFn: async () => {
      const response = await axiosInstance.get("/orders/" + id);
      setStatus(response.data.order.status);
      return response.data.order;
    },
    onError: async (e) => {
      toast.error(
        `Something went wrong: ${e?.response?.data?.message || e.message}`
      );
      console.log(e);
    },
  });
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      await axiosInstance.put(`/orders/${id}?status=${status}`);
      toast.success("Success");
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["order", id]);
    },
  });
  if (isLoading) return <p>Loading...</p>;

  const shipping = 0;
  const discount = 0;

  const productTotal = order.orderItems.reduce(
    (acc, item) => acc + item.priceAtPurchaseTime * item.quantity,
    0
  );
  const finalTotal = productTotal + shipping - discount;

  return (
    <div className="p-6 w-full max-w-4xl mx-auto bg-white rounded-lg shadow-md text-sm space-y-6">
      {/* Header */}
      <div className="border-b pb-3">
        <h1 className="text-2xl font-bold mb-1">Order Receipt</h1>
        <p className="text-gray-500">
          Order ID: <span className="text-black font-mono">{order._id}</span>
        </p>
        <p className="text-gray-500">
          Created At: {format(new Date(order.createdAt), "yyyy-M-d / hh:mm a")}
        </p>
      </div>

      {/* Customer Info */}
      <div>
        <h2 className="font-semibold text-base mb-2">Customer Info</h2>
        <div className="grid sm:grid-cols-2 gap-2">
          <div>
            <p>
              <strong>Name:</strong> {order.user.name}
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

      {/* Status Section */}
      <div className="rounded-lg p-4">
        <h2 className="font-semibold mb-2 text-base">Order Status</h2>
        <div className="mb-3 flex flex-wrap gap-3 items-center">
          <label className="font-medium">Status:</label>
          <select
            className="border p-1 rounded"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <button
            onClick={() => mutate()}
            disabled={isPending}
            className={`px-3 py-1 text-sm bg-black text-white rounded hover:bg-gray-800 ${
              isPending ? "btn-disabled" : ""
            }`}
          >
            Update
          </button>
        </div>

        <div className="space-y-1">
          <p>
            <strong>Paid At:</strong>{" "}
            {order.isPaid && order.paidAt ? (
              <span className="text-green-600 flex items-center gap-1">
                <FaCheckCircle />{" "}
                {format(new Date(order.paidAt), "yyyy/M/d hh:mm a")}
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
                <FaCheckCircle />{" "}
                {format(new Date(order.deliveredAt), "yyyy/M/d hh:mm a")}
              </span>
            ) : (
              <span className="text-yellow-600 flex items-center gap-1">
                <FaExclamationCircle /> Not Delivered Yet
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Items */}
      <div>
        <h2 className="font-semibold text-xl mb-2">Items:</h2>
        <div className="divide-y">
          {order.orderItems.map((item, idx) => (
            <div key={item._id} className="flex justify-between py-4 gap-4">
              <div className="flex gap-3 items-center">
                <img
                  src={item.image}
                  alt={`Product ${idx}`}
                  className="w-16 h-16 object-cover rounded-lg border"
                />
                <div className="space-y-1">
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
                    <strong>Price:</strong> ${item.priceAtPurchaseTime}
                  </p>
                </div>
              </div>
              <div className="text-right font-semibold text-base min-w-[80px]">
                ${item.priceAtPurchaseTime * item.quantity}
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
            <span>${productTotal}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>${shipping}</span>
          </div>
          <div className="flex justify-between">
            <span>Discount</span>
            <span>-${discount}</span>
          </div>
          <div className="border-t pt-2 flex justify-between font-bold text-base">
            <span>Total</span>
            <span>${finalTotal}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetails;
