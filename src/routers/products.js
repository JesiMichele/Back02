


import { Router } from "express";
import ProductManager from '../ProductManager.js'


const router = Router();




//Ruta products con query limit
router.get("/", async (req, res) => {

    try {
        const { limit } = req.query;

        const prod = new ProductManager();
        const productos = await prod.getProduct(limit)

        return res.json({ productos })
    } catch (error) {
        console.error("Error al obtener productos:", error);
        return res.status(500).json({ mensaje: "Error interno del servidor" });
    }

})


//Ruta products con id especifico
router.get("/:pid", async (req, res) => {

    try {
        const { pid } = req.params;
        const prod = new ProductManager();
        const producto = await prod.getProductById(pid);

        if (producto !== "Not Found") {
            return res.json({ producto });
        } else {
            return res.status(404).json({ mensaje: "Producto no encontrado" });
        }
    } catch (error) {
        console.error("Error al obtener producto por ID:", error);
        return res.status(500).json({ mensaje: "Error interno del servidor" });
    }

});

router.post("/", (req, res) => {
    const { title, description, price, thumbnails, code, stock, category, status } = req.body;
    const p = new ProductManager();
    const result = p.addProduct(title, description, price, thumbnails, code, stock, category, status);
    return res.json({ result });
})


router.put("/:pid", (req, res) => {
    const { pid } = req.params;
    const prod = new ProductManager();
    const result = prod.updateProduct(Number(pid), req.body)
    return res.json({ result });
})

router.delete("/:pid", (req, res) => {
    const { pid } = req.params;
    const p = new ProductManager();
    const result = p.deleteProduct(Number(pid));
    return res.json({ result });
})








export default router;