import { Router } from 'express';
import productManager from '../productManager.js';
import { io } from '../app.js'; // Importar socket.io

const router = Router();

// GET: Listar todos los productos con un límite opcional
router.get('/', async (req, res) => {
  try {
    const { limit } = req.query;
    const products = await productManager.getProducts(limit);
    res.status(200).json({ status: 'Exitoso', products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 'Error', msg: 'Error interno del servidor' });
  }
});

// GET: Obtener un producto por ID
router.get('/:pid', async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productManager.getProductById(Number(pid));
    if (!product) return res.status(404).json({ status: 'Error', msg: 'Producto no encontrado' });

    res.status(200).json({ status: 'Exitoso', product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 'Error', msg: 'Error interno del servidor' });
  }
});

// POST: Crear un nuevo producto
router.post('/', async (req, res) => {
  try {
    const body = req.body;
    const product = await productManager.addProduct(body);
    io.emit('updateProducts', await productManager.getProducts()); // Emitir actualización a todos los clientes
    res.status(201).json({ status: 'Exitoso', product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 'Error', msg: 'Error interno del servidor' });
  }
});

// PUT: Actualizar un producto por ID
router.put('/:pid', async (req, res) => {
  try {
    const { pid } = req.params;
    const body = req.body;
    const product = await productManager.updateProduct(Number(pid), body);
    if (!product) return res.status(404).json({ status: 'Error', msg: 'Producto no encontrado' });

    io.emit('updateProducts', await productManager.getProducts()); // Emitir actualización a todos los clientes
    res.status(200).json({ status: 'Exitoso', product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 'Error', msg: 'Error interno del servidor' });
  }
});

// DELETE: Eliminar un producto por ID
router.delete('/:pid', async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productManager.deleteProduct(Number(pid));
    if (!product) return res.status(404).json({ status: 'Error', msg: 'Producto no encontrado' });

    io.emit('updateProducts', await productManager.getProducts()); // Emitir actualización a todos los clientes
    res.status(200).json({ status: 'Exitoso', msg: `El producto con el id ${pid} fue eliminado` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 'Error', msg: 'Error interno del servidor' });
  }
});

export default router;








