import express from "express";
import { productRouter } from "./routes/product.router.js";
import { cartRouter } from "./routes/carrito.router.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log(__dirname);

const app = express();

//app.use(express.static("public"));
app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);

const servidor = 8080;

app.listen(servidor, () => {
  console.log(`Se prendio el servidor en el puerto: ${servidor}`);
});
