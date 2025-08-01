const mongoose = require("mongoose");
const ItemSchema = require("./item.model.js");

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    guestID: String,
    products: [ItemSchema],
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
  },
  { timestamps: true }
);

cartSchema.methods.toJSON = function () {
  cart = this.toObject();
  delete cart.user;
  return cart;
};

module.exports = mongoose.model("Cart", cartSchema);
