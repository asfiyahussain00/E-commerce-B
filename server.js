// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from "dotenv";

// import authRoutes from "./Routes/auth.js";
// import cartRoutes from "./Routes/cart.js";
// import contactRoutes from "./Routes/contact.js"; // <-- new
// dotenv.config();

// const app = express();

// // Middlewares

// // Allow all origins temporarily
// app.use(cors({
//   origin: "*",
//   credentials: true
// }));




// app.use(express.json());

// // Health check
// app.get("/", (req, res) => res.json({ status: "ok", app: "ecommerce-backend" }));

// // Routes
// app.use("/auth", authRoutes);
// app.use("/cart", cartRoutes);
// app.use("/contact", contactRoutes); // <-- add this

// // DB connect + server start
// const PORT = process.env.PORT || 5000;
// const MONGO_URI = process.env.MONGO_URI;

// mongoose
//   .connect(MONGO_URI)
//   .then(() => {
//     console.log("✅ MongoDB connected");
//     app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
//   })
//   .catch((err) => {
//     console.error("❌ MongoDB connection error:", err.message);
//     process.exit(1);
//   });
import express from "express";
import serverless from "serverless-http";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./Routes/auth.js";
import cartRoutes from "./Routes/cart.js";
import contactRoutes from "./Routes/contact.js";

dotenv.config();
const app = express();

app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());

app.get("/", (req, res) => res.json({ status: "ok" }));
app.use("/auth", authRoutes);
app.use("/cart", cartRoutes);
app.use("/contact", contactRoutes);

// MongoDB connection (serverless friendly)
mongoose.connect(process.env.MONGO_URI, {
  keepAlive: true,
  maxPoolSize: 10,
});

// Export as serverless function
export default serverless(app);
