const express = require('express')
const ProductManager = require('./ProductManager.js')



const PORT = 8080

const app = express()


//Ruta products con query limit
app.get("/products", async (req, res) => {

   try{
     const { limit } = req.query;

    const prod = new ProductManager();
    const productos= await prod.getProduct(limit)

    return res.json({ productos })
    }catch (error) {
        console.error("Error al obtener productos:", error);
        return res.status(500).json({ mensaje: "Error interno del servidor" });
    }

})


//Ruta products con id especifico
app.get("/products/:pid", async (req, res) => {

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



app.listen(PORT, () => console.log(`Server online con puerto ${PORT}`))