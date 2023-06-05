import express from "express";
import { carritoManager } from "../controllers/carrito.js";

const routerView = express.Router();

routerView.get("/cart/:cid", async (req, res) => {
  try {
    const prods = await carritoManager.getProdsConId(Number(req.params.cid));

    console.log(prods);
    await res
      .status(200)
      .render("carrito", { id: Number(req.params.cid), prods });
  } catch (e) {
    res.status(400).render(e.message);
  }
});

export { routerView };
