import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";

// Load environment variables from .env
dotenv.config();

// Import Routers
import productRouter from "./src/features/product/routes/product.routes.js";
import userRouter from "./src/features/user/userRoutes/user.routes.js";
import cartRouter from "./src/features/cart/routes/cart.routes.js";
import orderRouter from "./src/features/order/routes/order.routes.js";

// Optional: Import file upload middleware (not used directly here but good to have)
import uploads from "./src/middleware/fileUpload.middleware.js";

// Initialize Express server
const server = express();

// Middleware
server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

// Routes
server.use("/api/products", productRouter);
server.use("/api/user", userRouter);
server.use("/api/cart", cartRouter);
server.use("/api/order", orderRouter);

// Optional: Health check route
server.get("/", (req, res) => {
  res.send("🔥 BusyBuy backend is running");
});

// Start server
const PORT = process.env.PORT || 3200;
server.listen(PORT, () => {
  console.log(`✅ Server is listening at port ${PORT}`);
});
