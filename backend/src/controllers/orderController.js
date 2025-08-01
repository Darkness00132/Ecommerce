const Order = require("../models/order.model.js");
const asyncHandler = require("../utils/asyncHandler.js");

let orderController = {};

orderController.getOrders = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const skip = (page - 1) * limit;
  const totalOrders = await Order.countDocuments();

  const orders = await Order.find()
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 })
    .populate("user", "name email");

  res.status(200).json({
    page,
    orders,
    totaltotalPages: Math.ceil(totalOrders / limit),
    totalOrders,
  });
});

orderController.getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({
    createdAt: -1,
  });
  res.status(200).json({ orders });
});

orderController.getOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }
  if (order.user._id.toString() != req.user._id.toString()) {
    return res.status(400).json({ message: "Not authorized" });
  }
  res.status(200).json({ order });
});

orderController.updateOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return res.status(404).json({ message: "Order doesnot exist" });
  }
  order.status = req.query.status || order.status;
  order.isDelivered =
    req.query.status === "Delivered" ? true : order.isDelivered;
  order.deliveredAt =
    req.query.status === "Delivered" ? Date.now() : order.deliveredAt;

  const updatedOrder = await order.save();

  res.status(200).json({ order: updatedOrder });
});

module.exports = orderController;
