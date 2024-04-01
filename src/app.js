import express from "express";
import prodRouter from "./routers/products.js"
import cartsRouter from "./routers/carts.js"
import multer from "multer";


const app = express();

const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    return res.send('Hola, comencemos!');
})

app.use('/api/products', prodRouter);
app.use('/api/carts', cartsRouter);





app.listen(PORT, () => console.log(`Server online con puerto ${PORT}`));