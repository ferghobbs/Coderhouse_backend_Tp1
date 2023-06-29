import express from "express";
//import { productRouter } from "./routes/product.router.js";
//import { cartRouter } from "./routes/carrito.router.js";
import { productDBRouter } from "./routes/productDB.router.js";
import cartDBRouter from "./routes/cartDB.router.js";
//import { routerView } from "./routes/views.router.js";
import handlebars from "express-handlebars";
import { __dirname } from "../utils.js";
import mongoose from "mongoose";

const app = express();

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");

console.log(__dirname + "/views");
app.set("view engine", "handlebars");

app.use(express.static("public"));
app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

//app.use("/api/product", productRouter);
//app.use("/api/cart", cartRouter);
app.use("/api/product", productDBRouter);
app.use("/api/cart", cartDBRouter);
//app.use("/", routerView);
const servidor = 8080;

const httpServer = app.listen(servidor, () => {
  console.log(`Se prendio el servidor en el puerto: ${servidor}`);
  mongoose.connect(
    "mongodb+srv://ferghobbs:hobbs111@coderhouse.uqddu0c.mongodb.net/?retryWrites=true&w=majority"
  );
});

export { httpServer };
