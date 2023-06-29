import { Router } from "express";
import { carritoManager } from "../dao/controllers/carrito.js";

const cartRouter = Router();

cartRouter.post("/", async (req, res) => {
  try {
    let idC = await carritoManager.addCarrito();
    res.send(`Se agrego el carrito con id: ${idC}`);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

cartRouter.post("/:cid/product/:pid", async (req, res) => {
  try {
    await carritoManager.agregarProdACarrito(
      Number(req.params.cid),
      Number(req.params.pid)
    );
    res.send(
      `Se agrego al carrito con id: ${Number(
        req.params.cid
      )} el producto con id: ${Number(req.params.pid)}`
    );
  } catch (e) {
    res.status(400).send(e.message);
  }
});

cartRouter.get("/:cid", async (req, res) => {
  try {
    const carts = await carritoManager.getProdsFromCarrito(
      Number(req.params.cid)
    );
    res.send({
      status: "succes",
      products: carts,
    });
  } catch (e) {
    res.status(400).send(e.message);
  }
});

export { cartRouter };
