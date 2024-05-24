import express from "express";
import cookieParser from "cookie-parser";
import sessions from "express-session";
import { initPassport } from "./config/passport.config.js";
import passport from "passport";
import __dirname from "./utils.js";
import { engine } from "express-handlebars";
import { Server } from 'socket.io';
import prodRouter from "./routers/products.js"
import cartsRouter from "./routers/carts.js"
import {router as sessionsRouter} from "./routers/sessions.router.js"
import views from './routers/views.routes.js'

import { dbConecction } from "../database/config.js";
import { productModel } from "./dao/models/products.js";
import { messageModel } from "./dao/models/messages.js";




const app = express();
const PORT = 8080;




app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(sessions({
    secret: "CoderCoder123",
    resave: true, saveUninitialized:true
}));

initPassport();
app.use (passport.initialize());
app.use(passport.session());

app.engine('handlebars', engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));


app.use("/api/sessions", sessionsRouter)
app.use('/', views)
app.use('/api/products', prodRouter);
app.use('/api/carts', cartsRouter);
//app.use('api/login',usuarios)
await dbConecction();

const httpServer = app.listen(PORT, () => console.log('listenning puerto 8080'))
const io = new Server(httpServer);


//Cookies
app.get('/setcookies', (req, res) => {
    res.cookie("cookie1", "valor cookies 1", {})
    res.header('Content-Type', 'text/plain')
    res.status(200).send('cookie seteada')
})
//sessions

app.get('/session', (req, res) => {
    if(req.session.contador){
        req.session.contador++
    }else{
        req.session.contador=1
    }
    res.header('Content-Type', 'text/plain')
    res.status(200).send(`Visitas al sitio ${req.session.contador}`)
})

//Servidor con Socket
//Cliente se conecta-se obtiene la lista de productos
io.on('connection', async (socket) => {

    //evento productos- envia la lista del paso previo
    const productos = await productModel.find();
    socket.emit('productos', productos);


    //el Servidor espera el evento para agregar el producto solicitado por el cliente
    socket.on('agregarProducto', async (producto) => {
        const newProduct = await productModel.create({ ...producto })
        if (newProduct) {
            productos.push(newProduct)
            socket.emit('productos', productos)

        }

    });

    //Chat

    const messages = await messageModel.find();
    socket.emit('message', messages);

    socket.on('message', async (data) => {
        const newMessage = await messageModel.create({ ...data });

        if (newMessage) {
            const messages = await messageModel.find();
            io.emit('messageLogs', messages);
        }

    });

    socket.broadcast.emit('nuevo_user');



});











