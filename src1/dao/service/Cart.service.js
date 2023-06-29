import { cartModel } from "../models/cart.model.js";
import productService from "./Prod.service.js";

class CartService {
  constructor() {
    this.model = cartModel;
  }

  async getAll() {
    return await this.model.find();
  }
  async createcart() {
    return await this.model.create({ prods: [] });
  }
  async getcart(id) {
    if (!id) throw new Error("Miising Id required");
    return await this.model.findOne({ _id: id });
  }
  async addProdToCart(id, prod) {
    if (!id) throw new Error("Miising Id required");
    const cart = await this.model.findOne({ _id: id });
    const prodsId = await productService.getProduct(prod);

    cart.prods.push({ prod: prodsId._id.toString() });
    return await cart.save();
  }
}

const cartService = new CartService();
export default cartService;
