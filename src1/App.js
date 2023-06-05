import express from "express";
import { productRouter } from "./routes/product.router.js";
import { cartRouter } from "./routes/carrito.router.js";
import { routerView } from "./routes/views.router.js";
import handlebars from "express-handlebars";
import { __dirname } from "../utils.js";

const app = express();

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");

console.log(__dirname + "/views");
app.set("view engine", "handlebars");

//app.use(express.static("public"));
app.use(express.json());
//app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/", routerView);
const servidor = 8080;

app.listen(servidor, () => {
  console.log(`Se prendio el servidor en el puerto: ${servidor}`);
});

export { app };
