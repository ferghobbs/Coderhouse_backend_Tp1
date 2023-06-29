import { productModel } from "../models/product.model.js";

class ProductService {
  constructor() {
    this.model = productModel;
  }

  async getAll() {
    const prods = await this.model.find();
    const prods1 = prods.map((prod) => {
      const prod1 = prod.toObject();
      prod1.id = prod._id.toString();

      return prod1;
    });

    return await prods1;
  }
  async createProduct(prod) {
    if (
      !prod.code ||
      !prod.title ||
      !prod.description ||
      !prod.price ||
      !prod.thumbnail ||
      !prod.stock
    ) {
      throw new Error("Missing required fileds");
    }
    if (!prod.allow) prod.allow = false;

    return await this.model.create(prod);
  }
  async getProduct(id) {
    if (!id) throw new Error("Miising Id required");
    return await this.model.findOne({ _id: id });
  }
  async updateProductObjeto(id, prod) {
    if (!id) throw new Error("Miising Id required");
    console.log(prod);
    return await this.model.updateOne({ _id: id }, prod);
  }
  async deleteProductById(id) {
    return await this.model.deleteOne({ _id: id });
  }
}

const productService = new ProductService();
export default productService;
