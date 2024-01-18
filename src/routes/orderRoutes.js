import express from "express";
import { createOrder } from "../controllers/OrderController.js";

const router = express.Router();

// Routes
router.post("/create", createOrder);

export default router;
