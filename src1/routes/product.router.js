import { Router } from "express";
import ProductManager from "../Product.js";

const productRouter = Router();

const pM = new ProductManager("./src1/Productos.json");

productRouter.get("/", async (req, res) => {
  try {
    let prods = await pM.getProducts(req.query.limit);

    res.send({ status: "succes", payload: prods });
  } catch (e) {
    res.status(500).send(e);
  }
});
productRouter.get("/:id", async (req, res) => {
  try {
    let prod = await pM.getProductById(Number(req.params.id));
    res.send({ status: "succes", payload: prod });
  } catch (e) {
    res.status(400).send(e);
  }
});

productRouter.post("/", (req, res) => {
  let product = req.body;
  pM.addProductObjeto(product)
    .then(() => {
      res.send("El producto se agrego satisfactoriamente");
    })
    .catch((e) => {
      res.status(400).send(e.message);
    });
});

productRouter.put("/:id", (req, res) => {
  let product = req.body;
  pM.updateProductObjeto(product, Number(req.params.id))
    .then(() => {
      res.send("El producto se actualizo satisfactoriamente");
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

productRouter.delete("/:id", (req, res) => {
  pM.deleteProductById(Number(req.params.id))
    .then(() => {
      res.send("El producto se elimino satisfactoriamente");
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

export { productRouter };
