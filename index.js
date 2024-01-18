// index.js
import express from "express";
import bodyParser from "body-parser";
import routes from "./src/routes/allRoute.js";
import cartRoutes from "./src/routes/cartRoutes.js";
import orderRoutes from "./src/routes/orderRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/products", routes);
app.use("/cart", cartRoutes);
app.use("/orders", orderRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
