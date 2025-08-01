const Cart = require("../models/cart.model.js");
const Product = require("../models/product.model.js");
const asyncHandler = require("../utils/asyncHandler.js");

const getUser = require("../utils/getUser.js");

let cartController = {};

cartController.getCart = asyncHandler(async (req, res) => {
  const { guestID = "" } = req.query;

  const cartFilter = getUser(guestID, req.signedCookies.jwt, false);

  const cart = await Cart.findOne(cartFilter);
  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  res.status(200).json({
    cart,
  });
});

cartController.addProductToCart = asyncHandler(async (req, res) => {
  const { productID, guestID, quantity = 1, size, color } = req.body;

  const product = await Product.findById(productID);
  if (!product) return res.status(404).json({ message: "Product not found" });

  const cartFilter = getUser(guestID, req.signedCookies.jwt); // return user if in cookie or guestID

  let cart = await Cart.findOne(cartFilter);

  const item = {
    product: productID,
    image: product.images[0].url,
    name: product.name,
    quantity,
    size,
    color,
    priceAtPurchaseTime: product.discountPrice || product.price,
  };

  if (!cart) {
    cart = await Cart.create({
      ...cartFilter,
      products: [item],
      totalPrice: item.priceAtPurchaseTime * quantity,
    });
  } else {
    // Check if product with same variant exists
    const existingItem = cart.products.find(
      (p) =>
        p.product.toString() === productID &&
        p.size === size &&
        p.color === color
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.products.push(item);
    }

    cart.totalPrice = cart.products.reduce(
      (sum, p) => sum + p.quantity * p.priceAtPurchaseTime,
      0
    );

    await cart.save();
  }

  delete cart.user;
  res.status(200).json({ cart });
});

cartController.updateProductInCart = asyncHandler(async (req, res) => {
  const { productID, guestID, quantity, size, color } = req.query;

  // return user if in cookie or guestID without make new guestID
  const cartFilter = getUser(guestID, req.signedCookies.jwt, false);

  const cart = await Cart.findOne(cartFilter);
  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }
  const product = cart.products.find(
    (p) =>
      p.product.toString() === productID && p.size === size && p.color === color
  );
  if (!product) {
    return res.status(404).json({ message: "Product doesnot exist" });
  }
  if (product.quantity === 1 && quantity < 0) {
    return res
      .status(400)
      .json({ message: "Quantity value cannot be nagtive." });
  }
  product.quantity += Number(quantity);

  cart.totalPrice = cart.products.reduce(
    (sum, p) => sum + p.quantity * p.priceAtPurchaseTime,
    0
  );
  await cart.save();

  res.status(200).json({ cart });
});

cartController.deleteProductInCart = asyncHandler(async (req, res) => {
  const { productID, guestID, size, color } = req.query;

  // return user if in cookie or guestID without make new guestID
  const cartFilter = getUser(guestID, req.signedCookies.jwt, false);

  const cart = await Cart.findOne(cartFilter);
  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }
  //return all products except product we want delete
  cart.products = cart.products.filter(
    (p) =>
      !(
        p.product.toString() === productID &&
        p.size === size &&
        p.color === color
      )
  );

  cart.totalPrice = cart.products.reduce(
    (sum, p) => sum + p.quantity * p.priceAtPurchaseTime,
    0
  );

  await cart.save();
  res.status(200).json({ cart });
});

cartController.mergeProductsInCart = asyncHandler(async (req, res) => {
  const { guestID } = req.body;

  const guestCart = await Cart.findOne({ guestID });
  if (!guestCart) {
    return res.status(404).json({ error: "Guest cart not found" });
  }

  // Check if user already has a cart
  let userCart = await Cart.findOne({ user: req.user._id });

  if (!userCart) {
    // If user doesn't have a cart, create new one with guestCart data
    userCart = await Cart.create({
      user: req.user._id,
      products: guestCart.products,
      totalPrice: guestCart.totalPrice,
    });
  } else {
    // If user already has a cart → merge products
    guestCart.products.forEach((guestProduct) => {
      const match = userCart.products.find(
        (p) =>
          p.product.toString() === guestProduct.product.toString() &&
          p.size === guestProduct.size &&
          p.color === guestProduct.color
      );

      if (match) {
        match.quantity += guestProduct.quantity;
      } else {
        userCart.products.push(guestProduct);
      }
    });

    userCart.totalPrice = userCart.products.reduce(
      (sum, p) => sum + p.quantity * p.priceAtPurchaseTime,
      0
    );

    await userCart.save();
  }

  // Delete the guest cart after merge
  await Cart.deleteOne({ guestID });

  res.status(200).json({ cart: userCart });
});

module.exports = cartController;
