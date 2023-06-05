import { Router } from "express";
import { productManager } from "../controllers/Product.js";
const productRouter = Router();

productRouter.get("/", async (req, res) => {
  try {
    let prods = await productManager.getProducts(req.query.limit);

    res.send({ status: "succes", payload: prods });
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

productRouter.post("/", (req, res) => {
  let product = req.body;
  console.log(req);
  productManager
    .addProductObjeto(product)
    .then(() => {
      res.send("El producto se agrego satisfactoriamente");
    })
    .catch((e) => {
      res.status(400).send(e.message);
    });
});

productRouter.put("/:id", (req, res) => {
  let product = req.body;
  productManager
    .updateProductObjeto(product, Number(req.params.id))
    .then(() => {
      res.send("El producto se actualizo satisfactoriamente");
    })
    .catch((e) => {
      res.status(400).send(e.message);
    });
});

productRouter.delete("/:id", (req, res) => {
  productManager
    .deleteProductById(Number(req.params.id))
    .then(() => {
      res.send("El producto se elimino satisfactoriamente");
    })
    .catch((e) => {
      res.status(400).send(e.message);
    });
});

export { productRouter };
