import express from "express";
import {
  getCartContents,
  addToCart,
  removeFromCart,
} from "../controllers/CartController.js";

const router = express.Router();

// Routes
router.get("/", getCartContents);
router.post("/add", addToCart);
router.delete("/remove/:productId", removeFromCart);

export default router;
