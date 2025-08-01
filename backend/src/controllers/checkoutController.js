const asyncHandler = require("../utils/asyncHandler.js");
const Checkout = require("../models/checkout.model.js");
const Cart = require("../models/cart.model.js");
const Order = require("../models/order.model.js");

let checkoutController = {};

checkoutController.makeCheckout = asyncHandler(async (req, res) => {
  const { shippingAddress, paymentMethod } = req.body;
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart || cart.products.length === 0) {
    return res.status(404).json({ message: "Cart is empty" });
  }
  const checkoutItems = cart.products;
  const totalPrice = checkoutItems.reduce(
    (total, item) => total + item.priceAtPurchaseTime * item.quantity,
    0
  );
  const checkout = await Checkout.create({
    user: req.user._id,
    checkoutItems,
    shippingAddress,
    paymentMethod,
    totalPrice,
  });

  res.status(201).json({
    checkoutID: checkout._id,
  });
});

checkoutController.updateCheckout = asyncHandler(async (req, res) => {
  const { paymentStatus, paymentDetails } = req.body;
  const checkout = await Checkout.findById(req.params.id);
  if (!checkout) {
    return res.status(404).json({ message: "Checkout not found" });
  }
  if (checkout.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Not authorized" });
  }
  if (paymentStatus !== "COMPLETED") {
    return res.status(400).json({ message: "Invalid Payment Status" });
  }
  if (checkout.isPaid) {
    return res.status(400).json({ message: "You already paid" });
  }
  checkout.isPaid = true;
  checkout.paidAt = Date.now();
  checkout.paymentStatus = paymentStatus;
  checkout.paymentDetails = paymentDetails;
  await checkout.save();

  res.status(200).json({ checkout });
});

checkoutController.makeOrder = asyncHandler(async (req, res) => {
  const checkout = await Checkout.findById(req.params.id);
  if (!checkout) {
    return res.status(404).json({ message: "Checkout not found" });
  }
  if (checkout.user.toString() !== req.user.id) {
    return res.status(403).json({ message: "Not authorized" });
  }
  if (checkout.isPaid && !checkout.isFinalized) {
    const order = await Order.create({
      user: checkout.user,
      orderItems: checkout.checkoutItems,
      shippingAddress: checkout.shippingAddress,
      paymentMethod: checkout.paymentMethod,
      totalPrice: checkout.totalPrice,
      isPaid: true,
      paidAt: checkout.paidAt,
      paymentStatus: "Paid",
      paymentDetails: checkout.paymentDetails,
    });
    checkout.isFinalized = true;
    checkout.finalizedDate = Date.now();

    await checkout.save();

    await Cart.findOneAndUpdate(
      { user: checkout.user },
      { products: [], totalPrice: 0 }
    );
    res.status(201).json({ orderID: order.id });
  } else if (checkout.isFinalized) {
    return res.status(400).json({ message: "Checkout already finalized" });
  } else {
    res.status(400).json({ message: "Checkout is not paid" });
  }
});

module.exports = checkoutController;
