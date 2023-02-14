const fs = require("fs");

class ProductManager {
  productos;
  constructor(path) {
    this.path = path;
    this.products = [];
    this.idCounter = 0;
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.error("Todos los campos son obligatorios");
      return;
    }

    const existingProduct = this.products.find(
      (product) => product.code === code
    );
    if (existingProduct) {
      console.error("Ya existe un producto con ese código");
      return;
    }

    this.products.push({
      id: ++this.idCounter,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    });

    this.guardarEnArchivo();
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((product) => product.id === id);

    if (!product) {
      console.error("Not found");
      return;
    }

    return product;
  }

  guardarEnArchivo() {
    fs.writeFileSync(`./${this.path}`, JSON.stringify(this.products), (err) => {
      throw new Error(err);
    });
  }

  cargarElArchivo() {
    try {
      this.productos = JSON.parse(fs.readFileSync(`./${this.path}`, "utf-8"));
    } catch (err) {
      throw new Error(err);
    }
  }

  updateProduct(id, nuevoProducto) {
    const data = JSON.parse(fs.readFileSync(`./${this.path}`, "utf-8"));
    data.map((element) => {
      if (element.id === id) {
        element.title = nuevoProducto.title;
        element.description = nuevoProducto.description;
        element.price = nuevoProducto.price;
        element.thumbnail = nuevoProducto.thumbnail;
        element.code = nuevoProducto.code;
        element.stock = nuevoProducto.stock;
        element.id = id;
      }
    });
    fs.writeFileSync(`./${this.path}`, JSON.stringify(data));
  }

  deleteProduct(id) {
    const vacio = [];
    this.productos = JSON.parse(fs.readFileSync(`./${this.path}`, "utf-8"));
    this.productos.map((elemento) => {
      if (elemento.id != id) {
        vacio.push(elemento);
      }
    });
    fs.writeFileSync(`./${this.path}`, JSON.stringify(vacio));
  }
}

const productManager = new ProductManager("productos.json");

productManager.addProduct(
  "motorola",
  "motorola moto g30",
  55000,
  "https://www.google.com/url?sa=i&url=https%3A%2F%2Fplanetapreciosbajos.com%2Fproducto%2Fmotorola-moto-g30%2F&psig=AOvVaw07dlMDxwd8kDB9KTjGjg_-&ust=1676429904335000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCOCgwZqClP0CFQAAAAAdAAAAABAF",
  "D-01",
  4
);
productManager.addProduct(
  "samsung",
  "samsung galaxy s23",
  200000,
  "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.infobae.com%2Ftecno%2F2023%2F02%2F01%2Fgalaxy-s23-precios-y-caracteristicas-de-los-nuevos-celulares-de-samsung-que-ya-pueden-conseguirse-en-la-argentina%2F&psig=AOvVaw0NmaPpXu61OWCfk8Og7TiJ&ust=1676429863540000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCOiV5IaClP0CFQAAAAAdAAAAABAH",
  "Zap-4",
  65
);
productManager.addProduct(
  "iphone",
  "iphone 13 pro",
  400000,
  "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.macstation.com.ar%2Fiphone-13-pro-512-gb-plateado-silver.html&psig=AOvVaw0ZjA_dmH-9Mofwm-TorKxI&ust=1676429940935000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCLjHvauClP0CFQAAAAAdAAAAABAF",
  "Rem-3",
  56
);
productManager.cargarElArchivo();
productManager.updateProduct(
  4,
  "xiaomi",
  "xiaomi redmi note",
  18100605,
  "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.necxus.com.ar%2Fproductos%2F26207%2FCelular-Xiaomi-Redmi-Note-11-Dual-Sim-12&psig=AOvVaw1e4fjkFtvFg0wK4pkl14x4&ust=1676429992468000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCIitgMSClP0CFQAAAAAdAAAAABAG",
  "Au-01",
  2
);
productManager.deleteProduct(3);
