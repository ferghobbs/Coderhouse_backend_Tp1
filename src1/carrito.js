import fs from "fs";
import ProductManager from "./Product.js";

export default class CarritoManage {
  #path;
  #prodMan;
  constructor(path, pathProds) {
    this.#path = path;
    this.#prodMan = new ProductManager(pathProds);
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
      const prod = await this.#prodMan.getProductById(idP);
      console.log(prod);
      const carritos = await this.getCarritos();
      const carIndex = this.#getIndexById(idC, carritos);

      try {
        const prodIndex = this.#getIndexById(
          prod.id,
          carritos[carIndex].products
        );
        carritos[carIndex].products[prodIndex].Quantity++;
      } catch (e) {
        if (e.message === "No esta el prod") {
          console.log(carritos);
          carritos[carIndex].products.push({ id: idP, Quantity: 1 });
        } else {
          throw e;
        }
      }
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
      throw new Error("No esta el prod");
    }
    return carritoIndex;
  }

  async getCarritos(limit) {
    const res = await fs.readFileSync(this.#path, "utf-8");
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

    await fs.writeFileSync(this.#path, JSON.stringify(file));
    console.log(
      "----------------Se overwriteo el file de carritos---------------------------"
    );
  }
  async deleteFile() {
    try {
      await fs.rmSync(this.#path);
    } catch (e) {
      throw e;
    }
  }
  async #getId() {
    const res = await fs.readFileSync(this.#path, "utf-8");
    const res1 = JSON.parse(res);
    return res1.id;
  }

  async getProdsFromCarrito(id) {
    try {
      const carritos = await this.getCarritos();
      const index = this.#getIndexById(id, carritos);
      return carritos[index].products;
    } catch (error) {
      throw error;
    }
  }
}
