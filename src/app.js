const express = require('express')
const ProductManager = require('./ProductManager.js')



const PORT = 8080

const app = express()


//Ruta products con query limit
app.get("/products", (req, res) => {

    const { limit } = req.query;

    const prod = new ProductManager();

    return res.json({ productos: prod.getProduct(limit) })

})


//Ruta products con id especifico
app.get("/products/:pid", (req, res) => {
    const { pid } = req.params;
    const prod = new ProductManager();
    const producto = prod.getProductById(pid);

    if (producto !== "Not Found") {
        return res.json({ producto });
    } else {
        return res.status(404).json({ mensaje: "Producto no encontrado" });
    }
});



app.listen(PORT, () => console.log(`Server online con puerto ${PORT}`))