import fs from "fs";

let carts = [];
const pathFile = "./src/data/carts.json";

//getCarts para obtener los carritos desde el archivo, unción asincrónica que lee el 
//contenido del archivo de carritos, lo convierte de JSON a un objeto JavaScript y lo 
//asigna a la variable carts.
const getCarts = async () => {
  const cartsJson = await fs.promises.readFile(pathFile, "utf-8");
  const cartsPars = JSON.parse(cartsJson);
  carts = cartsPars || [];
};

//createCart función asincrónica que crea un nuevo carrito vacío con un ID único y 
//lo añade al arreglo carts. Luego, escribe los datos actualizados en el archivo de carritos 
//y devuelve el nuevo carrito creado.

const createCart = async () => {
  await getCarts();
  const newCart = {
    id: carts.length + 1,
    products: [],
  };

  carts.push(newCart);

  await fs.promises.writeFile(pathFile, JSON.stringify(carts));
  return newCart;
};

const getCartById = async (cid) => {
  
  await getCarts();
  const cart = carts.find((c) => c.id === cid);
  return cart;
};

const addProductToCart = async (cid, pid) => {
  await getCarts();
  const product = {
    product: pid,
    quantity: 1,
  };//se crea una constante del producto para que solo agregue lo solicitado en la consigna product id y quantity agregandose de a uno por eso va el uno.

  const index = carts.findIndex((cart) => cart.id === cid); //cada iteracción va a representar un carrito.
  carts[index].products.push(product);


  await fs.promises.writeFile(pathFile, JSON.stringify(carts));
  
  return carts[index];
};

export default {
  getCarts,
  getCartById,
  addProductToCart,
  createCart,
};
