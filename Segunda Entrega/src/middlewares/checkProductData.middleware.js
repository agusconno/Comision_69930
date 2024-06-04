import { request, response } from "express";
import productManager from "../productManager.js";

export const checkProductData = async (req = request, res = response, next) => {
  try {
    const { title, description, price, code, stock, category } = req.body; //desestruturamos la info que necesitamos para poder chequear que la información viaje correctamente
    const newProduct = {
      title,
      description,
      price,
      code,
      stock,
      category,
    };

    const products = await productManager.getProducts(); //aquie se traen todos los productos sin limite.
    // Validamos que no se repita el campo de codigo
    const productExists = products.find((p) => p.code === code);
    if (productExists) return res.status(400).json({ status: "Error", msg: `El producto con el código ${code} ya existe` });

    // Validamos que sean obligatorios
    const checkData = Object.values(newProduct).includes(undefined);
    if (checkData) return res.status(400).json({ status: "Error", msg: "Todos los datos son obligatorios" });

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
  }
};
