// CartController.js
import { updateProductQuantity } from "./ProductController.js";

const cart = [];

export const addToCart = (req, res) => {
  const { productId, quantity } = req.body;
  const productToAdd = getProductById(productId);

  if (!productToAdd || quantity > productToAdd.quantity || quantity <= 0) {
    return res.json({
      success: false,
      message: "Invalid product or quantity. Failed to add to cart.",
    });
  }

  const cartItemIndex = cart.findIndex((item) => item.product.id === productId);

  if (cartItemIndex !== -1) {
    cart[cartItemIndex].quantity += quantity;
  } else {
    cart.push({ product: productToAdd, quantity });
  }

  updateProductQuantity(productId, quantity);

  const updatedProducts = products.map((product) => {
    const cartItem = cart.find((item) => item.product.id === product.id);
    return {
      ...product,
      quantityInCart: cartItem ? cartItem.quantity : 0,
    };
  });

  res.json({
    success: true,
    message: "Product added to cart",
    updatedProducts,
  });
};

export const removeFromCart = (req, res) => {
  const productId = req.params.productId;
  const productToRemove = getProductById(productId);

  if (!productToRemove) {
    return res.json({
      success: false,
      message: "Product not found. Failed to remove from cart.",
    });
  }

  const cartItemIndex = cart.findIndex((item) => item.product.id === productId);

  if (cartItemIndex !== -1) {
    cart.splice(cartItemIndex, 1);
    res.json({ success: true, message: "Product removed from cart" });
  } else {
    res.json({ success: false, message: "Product not found in cart." });
  }
};

export const getCartContents = () => {
  const cartContents = cart.map((cartItem) => {
    const product = getProductById(cartItem.product.id);
    return {
      product,
      quantity: cartItem.quantity,
    };
  });

  return cartContents;
};
