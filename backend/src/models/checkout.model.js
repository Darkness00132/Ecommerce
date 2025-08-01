const mongoose = require("mongoose");
const ItemSchema = require("./item.model.js");

const checkoutSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  checkoutItems: {
    type: [ItemSchema],
    required: true,
  },
  shippingAddress: {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    postolCode: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  paidAt: {
    type: Date,
  },
  paymentStatus: {
    type: String,
    default: "Pending",
  },
  paymentDetails: {
    type: mongoose.Schema.Types.Mixed,
  },
  isFinalized: {
    type: Boolean,
    default: false,
  },
  finalizedDate: {
    type: Date,
  },
});

checkoutSchema.methods.toJSON = function () {
  checkout = this.toObject();
  delete checkout.user;
  return checkout;
};

module.exports = mongoose.model("Checkout", checkoutSchema);
