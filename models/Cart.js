import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
  {
    productId: { type: String, required: true }, // front-end product _id or SKU
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String }, // optional
    quantity: { type: Number, default: 1, min: 1 }
  },
  { _id: true } // <-- ab har product ka apna unique _id hoga
);

const cartSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    products: [cartItemSchema]
  },
  { timestamps: true }
);

export default mongoose.model("Cart", cartSchema);

