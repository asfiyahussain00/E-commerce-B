// backend/Routes/cart.js
import express from "express";
import Cart from "../models/Cart.js";
import auth from "../middleware/Auth.js";

const router = express.Router();

// utility
async function getUserCart(userId) {
  let cart = await Cart.findOne({ userId });
  if (!cart) cart = await Cart.create({ userId, products: [] });
  return cart;
}

// ➕ Add to Cart
router.post("/add", auth, async (req, res) => {
  try {
    const { productId, name, price, image } = req.body;
    if (!productId || !name || typeof price !== "number") {
      return res.status(400).json({ error: "productId, name, price required" });
    }

    const cart = await getUserCart(req.userId);
    const item = cart.products.find((p) => p.productId === productId);

    if (item) {
      item.quantity += 1;
    } else {
      cart.products.push({ productId, name, price, image, quantity: 1 });
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// 🛒 Get Cart
router.get("/", auth, async (req, res) => {
  try {
    const cart = await getUserCart(req.userId);
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});













// ❌ Remove item from Cart
// ❌ Remove item from Cart
router.delete("/:itemId", auth, async (req, res) => {
  try {
    const cart = await getUserCart(req.userId);

    // Filter subdocument _id
    cart.products = cart.products.filter(
      (item) => item._id.toString() !== req.params.itemId
    );

    await cart.save();

    // 🟢 Return plain JS object (toObject()) so frontend re-renders correctly
    res.json(cart.toObject());
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: "Server error" });
  }
});


export default router;



