import express from 'express'
import { productModel } from '../dao/models/products.js';
import { getProducts } from '../controllers/products.js';


const router = express.Router();

//ruta Get que renderiza la vista "home" y pasa la lista de productos(obtenidas por GetProduct de ProductManager)
router.get('/', async (req, res) => {

    const productos = await productModel.find().lean();
    return res.render('home', { productos, styles: 'index.css', title: 'Home' })
})


//ruta que renderiza la vista RealTimeProducts
router.get('/realtimeproducts', (req, res) => {

    return res.render('RealTimeProducts', { styles: 'index.css', title: 'Real Time' })
})


//Ruta de Chat
router.get('/chat', (req, res) => {

    return res.render('chat', { styles: 'chat.css', title: 'Chat' });
});


/*router.get('/products',async (req, res) => {
    const result= await getProducts({...req.query});
    return res.render('products', {title: 'Productos', result});
});*/

router.get('/products', async (req, res) => {
    try {
        const result = await getProducts({ ...req.query });
        return res.render('products', { title: 'Productos', result });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Comunicarse con un administrador' });
    }
});




export default router;