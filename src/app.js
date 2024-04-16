import express from "express";
import __dirname from "./utils.js";
import { engine } from "express-handlebars";
import { Server } from 'socket.io';
import prodRouter from "./routers/products.js"
import cartsRouter from "./routers/carts.js"
import views from './routers/views.routes.js'
import ProductManager from "./ProductManager.js";


const app = express();
const PORT = 8080;
const p = new ProductManager();
const httpServer = app.listen(PORT, () => console.log('listenning puerto 8080'))
const SocketServer = new Server(httpServer);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.engine('handlebars', engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));
app.use('/', views)
//Servidor con Socket
//Cliente se conecta-se obtiene la lista de productos
SocketServer.on('connection', socket => {

//evento productos- envia la lista del paso previo
    const productos = p.getProduct();
    socket.emit('productos', productos);

    
//el Servidor espera el evento para agregar el producto solicitado por el cliente
    socket.on('agregarProducto', producto => {
        const result = p.addProduct(producto)
        if (result.producto)
            socket.emit('productos', result.productos)
    })
})





app.use('/', views);
app.use('/api/products', prodRouter);
app.use('/api/carts', cartsRouter);




