import express from 'express'
import ProductManager from '../ProductManager.js';

const router = express.Router();

//ruta Get que renderiza la vista "home" y pasa la lista de productos(obtenidas por GetProduct de ProductManager)
router.get('/', (req, res) => {
    const p = new ProductManager();
    const productos = p.getProduct();
    return res.render('home', { productos })
})


//ruta que renderiza la vista RealTimeProducts
router.get('/realtimeproducts', (req, res) => {

    return res.render('RealTimeProducts')
})


export default router;