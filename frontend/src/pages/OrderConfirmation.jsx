import { format } from "date-fns";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance/axiosInstance";

const OrderConfirmation = () => {
  const { id } = useParams();
  const {
    data: order,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["order", id],
    queryFn: async () => {
      const response = await axiosInstance.get("/orders/" + id);
      return response.data.order;
    },
  });

  if (isError) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-center px-4">
        <h2 className="text-2xl font-semibold text-red-500 mb-2">
          Something went wrong
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          {error?.response?.data?.message ||
            error.message ||
            "Unable to load order details."}
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner text-primary loading-lg"></span>
      </div>
    );
  }

  const {
    _id,
    createdAt,
    orderItems,
    shippingAddress,
    paymentMethod,
    status,
    totalPrice,
  } = order;
  const subtotal = orderItems.reduce(
    (acc, item) => acc + item.priceAtPurchaseTime * item.quantity,
    0
  );
  const discount = 0;
  const shipping = 0;

  return (
    <div className="min-h-screen bg-base-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-base-100 shadow-lg rounded-2xl p-8 space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-green-500">
            Thank you for your order!
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            We’ve received your order and it’s being processed.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <h2 className="text-lg font-semibold">Order Info</h2>
            <p className="text-sm text-gray-600 mt-1">
              Order ID: <span className="font-medium">#{_id}</span>
            </p>
            <p className="text-sm text-gray-600">
              Date:{" "}
              <span className="font-medium">
                {format(new Date(createdAt), "yyyy-MM-dd")}
              </span>
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold">Shipping Address</h2>
            <p className="text-sm text-gray-600 mt-1">
              {shippingAddress.address}
            </p>
            <p className="text-sm text-gray-600">
              {shippingAddress.city}, {shippingAddress.country}
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold">Payment Method</h2>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-sm text-gray-600">{paymentMethod}</p>
              {status === "Paid" && (
                <span className="badge badge-success text-xs px-2 py-1">
                  Paid
                </span>
              )}
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
          <div className="space-y-4">
            {orderItems.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 items-start border-b pb-4 last:border-b-0"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 rounded-md object-cover"
                />
                <div className="flex flex-col gap-1">
                  <span className="font-semibold">{item.name}</span>
                  <span className="text-sm text-gray-500">
                    Size: {item.size} | Color: {item.color}
                  </span>
                  <span className="text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </span>
                  <span className="text-sm text-gray-500">
                    Price per unit: ${item.priceAtPurchaseTime}
                  </span>
                  <span className="text-sm font-bold text-primary">
                    Total: ${item.priceAtPurchaseTime * item.quantity}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-sm space-y-2 border-t pt-4">
          <div className="flex justify-between">
            <span className="font-medium">Subtotal:</span>
            <span>${subtotal}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Shipping:</span>
            <span>${shipping}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Discount:</span>
            <span>${discount}</span>
          </div>
          <div className="flex justify-between text-lg font-bold border-t pt-2">
            <span>Total:</span>
            <span>${totalPrice}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
