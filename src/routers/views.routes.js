import express from 'express'
import { productModel } from '../dao/models/products.js';


const router = express.Router();

//ruta Get que renderiza la vista "home" y pasa la lista de productos(obtenidas por GetProduct de ProductManager)
router.get('/', async (req, res) => {
   
    const productos = productModel.find();
    return res.render('home', { productos })
})


//ruta que renderiza la vista RealTimeProducts
router.get('/realtimeproducts', (req, res) => {

    return res.render('RealTimeProducts')
})


export default router;