import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./Routes/auth.js";
import cartRoutes from "./Routes/cart.js";
import contactRoutes from "./Routes/contact.js"; // <-- new
dotenv.config();

const app = express();

// Middlewares
app.use(cors({
  origin: process.env.FRONTEND_URL, // ✅ frontend URL from .env
  credentials: true
}));
app.use(express.json());

// Health check
app.get("/", (req, res) => res.json({ status: "ok", app: "ecommerce-backend" }));

// Routes
app.use("/auth", authRoutes);
app.use("/cart", cartRoutes);
app.use("/contact", contactRoutes); // <-- add this

// DB connect + server start
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });
