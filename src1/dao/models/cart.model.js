import mongoose from "mongoose";
const cartSchema = new mongoose.Schema({
  prods: {
    default: [],
    type: [
      {
        qty: {
          default: 1,
          type: Number,
        },
        prod: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
        },
      },
    ],
  },
});

export const cartModel = mongoose.model("carts", cartSchema);
