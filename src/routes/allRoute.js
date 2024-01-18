// allRoute.js
import express from "express";
const router = express.Router();
import {
  getAllProducts,
  getproduct,
  getproductById,
  addproduct,
  updateproduct,
  deleteproduct,
} from "../controllers/ProductController.js";

// Routes
router.get("/", getAllProducts);
router.get("/", getproduct);
router.post("/", addproduct);
router.get("/:id", getproductById);
router.put("/:id", updateproduct);
router.delete("/:id", deleteproduct);

export default router;
