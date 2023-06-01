import fs from "fs";

export default class ProductManager {
  #path;
  constructor(path) {
    this.#path = path;
    this.inicializar();
  }
  async inicializar() {
    if (await fs.existsSync(this.#path)) {
      console.log("Ya existe el archivo, no se inicializa de cero");
      return;
    }
    await this.#writeFile(0, []);
  }
  async addProductObjeto(product) {
    try {
      await this.addProduct(
        product.title,
        product.description,
        product.price,
        product.thumbnail,
        product.code,
        product.stock
      );
    } catch (e) {
      throw e;
    }
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
    const productos = await this.getProducts();
    if (productos.findIndex((p) => p.code === code) > -1) {
      throw "Error: Codigo duplicado";
    }

    let prod = {
      code,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };
    if (Object.values(prod).includes(undefined)) {
      throw "Error: Es necesario llenar todos los campos del producto";
    }
    const id = await this.#getId();
    prod = { ...prod, id };
    productos.push(prod);
    await this.#writeFile(id + 1, productos);
  }

  async getProducts(limit) {
    const res = await fs.readFileSync(this.#path, "utf-8");
    const res1 = JSON.parse(res);

    if (limit != undefined && limit < res1.productos.length) {
      return res1.productos.slice(0, limit);
    }
    return res1.productos;
  }
  async getProductById(id) {
    try {
      const productos = await this.getProducts();
      const prodIndex = this.#getIndexById(id, productos);
      return productos[prodIndex];
    } catch (e) {
      throw e;
    }
  }
  async #getId() {
    const res = await fs.readFileSync(this.#path, "utf-8");
    const res1 = JSON.parse(res);
    return res1.id;
  }

  #getIndexById(id, productos) {
    const prodIndex = productos.findIndex((producto) => {
      return producto.id === id;
    });

    if (prodIndex === -1) {
      throw new Error("Error no existe el producto");
    }
    return prodIndex;
  }

  async updateProduct(id, key, value) {
    try {
      const productos = await this.getProducts();
      const prodIndex = this.#getIndexById(id, productos);
      if (Object.keys(productos[prodIndex]).includes(key)) {
        productos[prodIndex][key] = value;
        console.log("se updeteo el producto");
      } else {
        throw "Error: No existe la Key";
      }
      await this.#writeFileWOIDN(productos);
    } catch (e) {
      throw e;
    }
  }

  async updateProductObjeto(productActualizado, id) {
    if (!id) {
      throw "Error: No se envio el ID del producto a actualizar";
    }
    try {
      const productos = await this.getProducts();
      const prodIndex = await this.#getIndexById(id, productos);
      const keysProd = Object.keys(productActualizado);
      if (keysProd.includes("id")) throw "Error: El ID se manda por parametro";

      if (
        !this.#contieneTodosLosElementos(
          Object.keys(productos[prodIndex]),
          keysProd
        )
      ) {
        throw "Error: Hay campos de mas";
      }

      productos[prodIndex] = { ...productos[prodIndex], ...productActualizado };

      console.log("se updeteo el producto");
      await this.#writeFileWOIDN(productos);
    } catch (e) {
      throw e;
    }
  }
  async #writeFileWOIDN(productos) {
    const id = await this.#getId();
    await this.#writeFile(id, productos);
  }

  async deleteProductById(id) {
    try {
      const productos = await this.getProducts();
      const prodIndex = this.#getIndexById(id, productos);
      productos.splice(prodIndex, 1);
      await this.#writeFileWOIDN(productos);
    } catch (e) {
      throw e;
    }
  }

  async #writeFile(id, productos) {
    const file = {
      id: id,
      productos: productos,
    };

    await fs.writeFileSync(this.#path, JSON.stringify(file));
    console.log(
      "----------------Se overwriteo el file---------------------------"
    );
  }

  async deleteFile() {
    try {
      await fs.rmSync(this.#path);
    } catch (e) {
      throw e;
    }
  }
  #contieneTodosLosElementos(arr1, arr2) {
    return arr2.every(function (element) {
      return arr1.includes(element);
    });
  }
}
