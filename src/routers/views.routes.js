import express from 'express'
import { productModel } from '../dao/models/products.js';
import { ManagerMon } from '../dao/managerMon.js/managerMon.js';





const router = express.Router();

//ruta Get que renderiza la vista "home" y pasa la lista de productos(obtenidas por GetProducts de ProductManager)
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





const  productManager = new ManagerMon()
router.get('/products', async (req, res) => {

    let {pagina} = req.query
    if(!pagina) pagina = 1

    let {docs:productos,totalPages,hasPrevPage,hasNextPage,prevPage,nextPage} = await productManager.getAllPaginate(pagina)
    console.log(productos)
    res.setHeader('Content-Type', 'text/html')
    res.status(200).render('products',{productos,totalPages,hasPrevPage,hasNextPage,prevPage,nextPage})
})


/*router.get('/products', async (req, res) => {
    let carrito= await cartsManager.getOneBy();
    if(!carrito){
        carrito= await cartsManager.create()
    }
    let productos 
   
    try {
        productos= await productManager.getAll()
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Comunicarse con un administrador' });
    }
});

*/


export default router;