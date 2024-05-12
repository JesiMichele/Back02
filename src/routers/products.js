import { Router } from "express";
import { addProduct, deleteProduct, getProductById, getProducts, updateProduct }from '../public/js/productManager.js';
//import ProductManager from '../ProductManager.js'


const router = Router();

//Ruta products con query limit
router.get('/', getProducts);


//Ruta products con id especifico
router.get("/:pid", getProductById);

//Agregar producto
router.post("/", addProduct);

//Actualizar producto
router.put("/:pid", updateProduct);

//Eliminar producto
router.delete("/:pid", deleteProduct);








export default router;