import { Router } from "express";
import { productManager } from "../controllers/Product.js";
import { httpServer } from "../App.js";

import { Server } from "socket.io";
import axios from "axios";

const serverUrl = "";
const productRouter = Router();
let socketServer;

productRouter.get("/", async (req, res) => {
  try {
    let prods = await productManager.getProducts(req.query.limit);
    conectarSocket(req.hostname + ":8080" + req.baseUrl, prods);

    res.render("realTimeProducts", { msg: undefined });
  } catch (e) {
    res.status(500).send(e.message);
  }
});
productRouter.get("/:id", async (req, res) => {
  try {
    let prod = await productManager.getProductById(Number(req.params.id));

    res.send({ status: "succes", payload: prod });
  } catch (e) {
    res.status(400).send(e.message);
  }
});

productRouter.post("/", async (req, res) => {
  let product = req.body;
  try {
    await productManager.addProductObjeto(product);
    let prods = await productManager.getProducts();
    if (socketServer) {
      socketServer.emit("prods", prods);
      res.render("realTimeProducts", {
        msg: "El producto se agrego satisfactoriamente",
      });
    } else {
      res.status(200).send("Se agrego el producto correctamente");
    }
  } catch (e) {
    res.status(400).send(e.message);
  }
});

productRouter.put("/:id", async (req, res) => {
  let product = req.body;
  try {
    await productManager.updateProductObjeto(product, Number(req.params.id));
    let prods = await productManager.getProducts(req.query.limit);
    socketServer.emit("prods", prods);
    res.send("El producto se actualizo satisfactoriamente");
  } catch (e) {
    res.status(400).send(e.message);
  }
});

productRouter.delete("/:id", async (req, res) => {
  try {
    await productManager.deleteProductById(Number(req.params.id));
    res.send("El producto se elimino satisfactoriamente");
    let prods = await productManager.getProducts(req.query.limit);
    socketServer.emit("prods", prods);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

export { productRouter };

function conectarSocket(server, prods, admin) {
  admin = true;
  console.log(prods);
  socketServer = new Server(httpServer);

  socketServer.on("connection", (socket) => {
    console.log("Nuevo admin conectado");
    socket.emit("prods", prods);

    socket.on("addProd", (prod) => {
      try {
        // const res = await axios.post()
      } catch (e) {
        throw e;
      }
    });
  });
}

function conectarSocketAdmin(prods) {}
