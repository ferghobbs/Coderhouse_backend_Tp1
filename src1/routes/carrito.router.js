import { Router } from "express";
import CarritoManage from "../carrito.js";

const cartRouter = Router();

const cM = new CarritoManage("./src1/Carritos.json", "./src1/Productos.json");

cartRouter.post("/", async (req, res) => {
  try {
    let idC = await cM.addCarrito();
    res.send(`Se agrego el carrito con id: ${idC}`);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

cartRouter.post("/:cid/product/:pid", async (req, res) => {
  try {
    await cM.agregarProdACarrito(
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
    const carts = await cM.getProdsFromCarrito(Number(req.params.cid));
    res.send({
      status: "succes",
      products: carts,
    });
  } catch (e) {
    res.status(500).send(e.message);
  }
});

export { cartRouter };
