// OrderController.js
import { getCartContents, removeFromCart } from "./CartController.js";
import products from "../../product.js";

export const createOrder = (req, res) => {
  const cartItems = getCartContents();

  if (!cartItems || cartItems.length === 0) {
    return res.json({
      success: false,
      message: "Cart is empty. Cannot create an order.",
    });
  }

  for (const cartItem of cartItems) {
    const { product, quantity } = cartItem;
    const productInStock = products.find((p) => p.id === product.id);

    if (!productInStock || quantity > productInStock.quantity) {
      return res.json({
        success: false,
        message: `Invalid cart item. Product not found or insufficient stock.`,
      });
    }
  }

  const totalPrice = cartItems.reduce((total, cartItem) => {
    const { product, quantity } = cartItem;
    return total + product.price * quantity;
  }, 0);

  const orderDetails = cartItems.map((cartItem) => {
    const { product, quantity } = cartItem;
    return {
      product,
      quantity,
    };
  });

  for (const cartItem of cartItems) {
    const { product, quantity } = cartItem;
    const productIndex = products.findIndex((p) => p.id === product.id);
    products[productIndex].quantity -= quantity;
  }

  cartItems.forEach((cartItem) => {
    removeFromCart({ params: { productId: cartItem.product.id } }, {});
  });

  res.json({
    success: true,
    message: "Order created successfully",
    order: {
      total: totalPrice,
      details: orderDetails,
    },
  });
};
