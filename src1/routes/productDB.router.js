import { Router } from "express";
import productService from "../dao/service/Prod.service.js";
import { httpServer } from "../App.js";

import { Server } from "socket.io";

const productDBRouter = Router();
let socketServer;

productDBRouter.get("/", async (req, res) => {
  try {
    const prods = await productService.getAll();
    conectarSocket(req.hostname + ":8080" + req.baseUrl, prods);
    res.render("realTimeProducts", { msg: undefined });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

productDBRouter.post("/", async (req, res) => {
  try {
    const prod = await productService.createProduct(req.body);
    let prods = await productService.getAll();

    socketServer.emit("prods", prods);
    res.status(200);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//TODO

productDBRouter.get("/:id", async (req, res) => {
  try {
    let prod = await productService.getProduct(req.params.id);

    res.send({ status: "succes", payload: prod });
  } catch (e) {
    res.status(500).send(e.message);
  }
});

productDBRouter.put("/:id", async (req, res) => {
  let product = req.body;
  try {
    console.log(product);
    await productService.updateProductObjeto(req.params.id, product);
    let prods = await productService.getAll();
    socketServer.emit("prods", prods);
    res.send("El producto se actualizo satisfactoriamente");
  } catch (e) {
    res.status(500).send(e.message);
  }
});

productDBRouter.delete("/:id", async (req, res) => {
  try {
    await productService.deleteProductById(req.params.id);
    let prods = await productService.getAll();
    socketServer.emit("prods", prods);
    res.sendStatus(204);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

export { productDBRouter };

function conectarSocket(server, prods, admin) {
  admin = true;
  socketServer = new Server(httpServer);
  socketServer.on("connection", (socket) => {
    console.log("Nuevo admin conectado");
    socket.emit("prods", prods);

    socket.on("newProd", async (prod) => {
      try {
        const prod1 = await productService.createProduct(prod);
        let prods = await productService.getAll();

        socketServer.emit("prods", prods);
      } catch (e) {
        throw e;
      }
    });
  });
}
