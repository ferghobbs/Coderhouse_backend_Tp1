import { Router } from "express";
import cartService from "../dao/service/Cart.service.js";
import { httpServer } from "../App.js";

import { Server } from "socket.io";

const cartDBRouter = Router();

cartDBRouter.get("/:cid", async (req, res) => {
  try {
    const carts = await cartService.getcart(req.params.cid);
    res.send({
      status: "succes",
      products: carts,
    });
  } catch (e) {
    res.status(500).send(e.message);
  }
});

cartDBRouter.get("/", async (req, res) => {
  try {
    const carts = await cartService.getAll();
    res.send({
      status: "succes",
      carts: carts,
    });
  } catch (e) {
    res.status(500).send(e.message);
  }
});

cartDBRouter.post("/", async (req, res) => {
  try {
    let idC = await cartService.createcart();
    res.send(`Se agrego el carrito con id: ${idC}`);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

cartDBRouter.post("/:cid/product/:pid", async (req, res) => {
  try {
    await cartService.addProdToCart(req.params.cid, req.params.pid);
    res.send(
      `Se agrego al carrito con id: ${req.params.cid} el producto con id: ${req.params.pid}`
    );
  } catch (e) {
    res.status(400).send(e.message);
  }
});

export default cartDBRouter;
