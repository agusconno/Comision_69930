import { Router } from "express";
import productManager from "../productManager.js";
import { checkProductData } from "../middlewares/checkProductData.middleware.js";

const router = Router();
//EL CRUD COMPLETO DE LOS PRODUCTOS.

//GET 

router.get("/", async (req, res) => {
  try {
    const { limit } = req.query;
    const products = await productManager.getProducts(limit);//alamcenamos los productos con la constante.
    //  Forzamos el error
    res.status(200).json({ status: "Existoso", products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
  }
});

router.get("/:pid", async (req, res) => { //para poder identificar pid
  try {
    const { pid } = req.params;
    const product = await productManager.getProductById(Number(pid));
    if (!product) return res.status(404).json({ status: "Error", msg: "Producto no encontrado" }); //para manejar el error 404 para cuando no se encuentra producto.

    res.status(200).json({ status: "Existoso", product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
  }
});

//PUT

router.put("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const body = req.body
    const product = await productManager.updateProduct(Number(pid), body);
    if (!product) return res.status(404).json({ status: "Error", msg: "Producto no encontrado" });

    res.status(200).json({ status: "Exitoso", product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
  }
});

//POST

router.post("/", checkProductData, async (req, res) => {
  try {
    const body = req.body;
    const product = await productManager.addProduct(body);

    res.status(201).json({ status: "Exitoso", product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
  }
});

//DELETE

router.delete("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productManager.deleteProduct(Number(pid));
    if (!product) return res.status(404).json({ status: "Error", msg: "Producto no encontrado" });

    res.status(200).json({ status: "Exitoso", msg: `El producto con el id ${pid} fue eliminado` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
  }
});
export default router;







