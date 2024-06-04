import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pathFile = path.join(__dirname, "data/products.json");

let products = [];

const addProduct = async (product) => {
  await getProducts();
  const { title, description, price, thumbnail, code, stock, category } = product;
  const newProduct = {
    id: products.length + 1,
    title,
    description,
    price,
    thumbnail: thumbnail || [],
    code,
    stock,
    category,
    status: true,
  };

  products.push(newProduct);
  await fs.promises.writeFile(pathFile, JSON.stringify(products, null, 2));
  console.log('Producto agregado:', newProduct);
  return newProduct;
};

const getProducts = async (limit) => {
  try {
    const productsJson = await fs.promises.readFile(pathFile, "utf8");
    const productsParse = JSON.parse(productsJson);
    products = productsParse || [];
    console.log('Productos leídos:', products);
    if (!limit) return products;
    return products.slice(0, limit);
  } catch (error) {
    console.error("Error leyendo los productos:", error);
    return [];
  }
};

const getProductById = async (id) => {
  await getProducts();
  const product = products.find((p) => p.id === id);
  console.log('Producto encontrado:', product);
  return product;
};

const updateProduct = async (id, productData) => {
  await getProducts();
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return null;
  products[index] = { ...products[index], ...productData };
  await fs.promises.writeFile(pathFile, JSON.stringify(products, null, 2));
  console.log('Producto actualizado:', products[index]);
  return products[index];
};

const deleteProduct = async (id) => {
  await getProducts();
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return null;
  const deletedProduct = products.splice(index, 1);
  await fs.promises.writeFile(pathFile, JSON.stringify(products, null, 2));
  console.log('Producto eliminado:', deletedProduct);
  return deletedProduct;
};

export default {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};


