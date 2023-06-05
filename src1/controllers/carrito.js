import fs from "fs";
import { productManager } from "./Product.js";

class CarritoManage {
  #path;
  #prodMan;
  constructor(path) {
    this.#path = path;
    this.#prodMan = productManager;
    this.inicializar();
  }
  async inicializar() {
    if (await fs.existsSync(this.#path)) {
      console.log("Ya existe el archivo de carritos, no se inicializa de cero");
      return;
    }
    await this.#writeFile(0, []);
  }

  async addCarrito() {
    const carritos = await this.getCarritos();
    const id = await this.#getId();
    carritos.push({ id, products: [] });
    await this.#writeFile(id + 1, carritos);
    return id;
  }

  async agregarProdACarrito(idC, idP) {
    try {
      let status = false;
      const prod = await this.#prodMan.getProductById(idP);
      const carritos = await this.getCarritos();
      carritos.map((cart) => {
        if (cart.id === idC) {
          let statusProd = false;
          cart.products.map((product) => {
            if (product.id === prod.id) {
              statusProd = true;
              product.Quantity++;
            }
            return product;
          });
          if (!statusProd) cart.products.push({ id: prod.id, Quantity: 1 });
          status = true;
          return cart;
        }
      });
      if (!status) throw new Error("No existe el carrito");
      await this.#writeFileWOIDN(carritos);
    } catch (e) {
      throw e;
    }
  }

  async #writeFileWOIDN(carritos) {
    const id = await this.#getId();
    await this.#writeFile(id, carritos);
  }

  #getIndexById(id, carritos) {
    const carritoIndex = carritos.findIndex((carr) => {
      return carr.id === id;
    });
    if (carritoIndex === -1) {
      throw new Error("No esta el id");
    }
    return carritoIndex;
  }

  async getCarritos(limit) {
    const res = await fs.promises.readFile(this.#path, "utf-8");

    const res1 = JSON.parse(res);

    if (limit != undefined && limit < res1.carritos.length) {
      return res1.carritos.slice(0, limit);
    }
    return res1.carritos;
  }

  async #writeFile(id, carritos) {
    const file = {
      id: id,
      carritos: carritos,
    };

    await fs.promises.writeFile(this.#path, JSON.stringify(file));
    console.log(
      "----------------Se overwriteo el file de carritos---------------------------"
    );
  }
  async deleteFile() {
    try {
      fs.rmSync(this.#path);
    } catch (e) {
      throw e;
    }
  }
  async #getId() {
    const res = await fs.promises.readFile(this.#path, "utf-8");
    const res1 = JSON.parse(res);
    return res1.id;
  }

  async getProdsFromCarrito(id) {
    try {
      const carritos = await this.getCarritos();
      const cart = carritos.find((cart) => {
        return cart.id === id;
      });
      if (!cart) throw new Error("No se encontro el carrito");
      return cart.products;
    } catch (error) {
      throw error;
    }
  }
  async getProdConId(id) {
    try {
      return await this.#prodMan.getProductById(id);
    } catch (error) {
      throw error;
    }
  }
  async getProdsConId(id) {
    try {
      const idProds = await this.getProdsFromCarrito(id);
      const products = await this.#prodMan.getProdsWithIDS(idProds);
      return products;
    } catch (error) {
      throw error;
    }
  }
}

const carritoManager = new CarritoManage("./src1/controllers/Carritos.json");
export { carritoManager };
