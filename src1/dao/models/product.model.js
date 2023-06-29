import mongoose from "mongoose";

export const productSchema = new mongoose.Schema({
  code: { type: String, requird: true, unique: true },
  title: { type: String, requird: true },
  description: { type: String, requird: true },
  price: { type: Number, requird: true },
  thumbnail: { type: String, requird: true },
  stock: { type: Number, requird: true },
  allow: { type: Boolean, requird: true },
});

export const productModel = mongoose.model("products", productSchema);
