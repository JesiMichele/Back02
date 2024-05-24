import express from 'express'
import { productModel } from '../dao/models/products.js';
import { ManagerMon } from '../dao/models/managerMon.js';
import { auth } from '../middleware/auth.js';
import { CartManager } from '../dao/CartManager.js';

//import { usuarioModelo } from '../dao/models/usuarios.js';





const router = express.Router();

//ruta Get que renderiza la vista "home" y pasa la lista de productos(obtenidas por GetProducts de ProductManager)
/*router.get('/', async (req, res) => {

    const productos = await productModel.find().lean();
    return res.render('home', { productos, styles: 'index.css', title: 'Home' })
})*/


//ruta que renderiza la vista RealTimeProducts
router.get('/realtimeproducts', (req, res) => {

    return res.render('RealTimeProducts', { styles: 'index.css', title: 'Real Time' })
})


//Ruta de Chat
router.get('/chat', (req, res) => {

    return res.render('chat', { styles: 'chat.css', title: 'Chat' });
});





const productManager = new ManagerMon()
const cartsManager = new CartManager()


/*router.get('/products', auth, async (req, res) => {

    let { pagina } = req.query
    if (!pagina) pagina = 1

    let { docs: productos, totalPages, hasPrevPage, hasNextPage, prevPage, nextPage } = await productManager.getAllPaginate(pagina)
    console.log(productos)
    res.setHeader('Content-Type', 'text/html')
    res.status(200).render('products', { productos, totalPages, hasPrevPage, hasNextPage, prevPage, nextPage })
})*/






router.get('/productos', auth, async (req, res) => {

    let carrito = {
        _id: req.session.usuario.carrito._id
    }
    let productos
    try {
        productos = await productManager.getAll()
    } catch (error) {
        console.log(error);
        res.setHeader('Content-Type', 'application/json');
        return res.status(500).json(
            {
                error: `Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
                detalle: `${error.message}`
            }
        )
    }

    res.setHeader('Content-Type', 'text/html')
    res.status(200).render("productos", {
        productos,
        carrito
    })
})


//Ruta carrito

router.get("/carrito/:cid", async (req, res) => {
    let { cid } = req.params

    let carrito = await cartsManager.getOneByPopulate({ _id: cid })

    res.setHeader('Content-Type', 'text/html');
    return res.status(200).render("carrito", { carrito });
})

//Ruta Login



router.get('/', (req, res) => {

    res.status(200).render('login', { login: req.session.usuario })
})


router.get('/login', (req, res, next) => {
    if (req.session.usuario) {
        return res.redirect('/perfil')
    }

    next()
}, (req, res) => {

    let { error, mensaje } = req.query

    res.status(200).render('login', { error, mensaje, login: req.session.usuario })
})



//Ruta Registro
router.get('/registro', (req, res, next) => {

    if (req.session.usuario) {
        return res.redirect('/perfil')
    }

    next()
}, (req, res) => {
    let { error } = req.query

    res.status(200).render('registro', { error, login: req.session.usuario })
});


//Ruta Perfil

router.get('/perfil', auth, (req, res) => {
    return res.render('perfil', {
        usuario: req.session.usuario
    });
});








export default router;