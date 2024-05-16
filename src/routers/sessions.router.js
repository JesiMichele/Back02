import { Router } from "express";
import { UsuariosManagerMongo } from "../public/js/UsuariosManager.js";
import { generaHash } from "../utils.js";
import { CartManager } from "../dao/CartManager.js";
//import * as cartsManager from "../public/js/cartsManager.js"


export const router = Router();

const usuariosManager = new UsuariosManagerMongo();
const cartManager=new CartManager()

router.post('/registro', async (req, res) => {

    let { nombre, email, password ,web} = req.body
    if (!nombre || !email || !password){
    if(web){
        return res.redirect(`/registro?error=Complete nombre, email, y password`)
    }else{
        res.setHeader('Content-Type','application/json');
        return res.status(404).json({ msg: `Complete nombre, email, passsword` })
    }}

    let existe = await usuariosManager.getBy({ email })
    if (existe) {
        if(web){
            return res.redirect(`/registro?error=Ya existe ${email}`)
        }else{
            res.setHeader('Content-Type','application/json');
        return res.status(404).json({ msg: `Ya existe el email ${email}` })
    }
}

    password = generaHash(password)

    try {
        
        let carritoNuevo=await cartManager.create()
        let nuevoUsuario = await usuariosManager.create({nombre, email, password,rol:"user", carrito:carritoNuevo._id})
        if(web){
            return res.redirect(`/login?mensaje=Registro correcto para ${nombre}`)
        }else{
        return res.status(200).json({ message: "Registro correcto!", nuevoUsuario })}

    
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: `Error inespeerado en el servidor.Intente mas tarde`,
            detalle: `${error.message}`
        })
    }
})

router.post('/login', async (req, res) => {
    let { email, password } = req.body

    console.log(req.body)
    if (!email || !password)
    if(web){
        return res.redirect(`/login?error=Complete email, y password`)
    }else{
        return res.status(404).json({ msg: `Complete email, passsword` })}


    console.log("Datos de inicio de sesión:", { email, password: generaHash(password) });

    let usuario = await usuariosManager.getByPopulate({ email, password: generaHash(password) })
   
   
   
    console.log("Usuario encontrado:", usuario);

    if (!usuario) {

        if(web){
            return res.redirect(`/login?error=Credenciales invalidas`)
        }else{
        return res.status(404).json({ msg: `Credenciales invalidas` })}
    }

    usuario = { ...usuario }
    delete usuario.password
    req.session.usuario = usuario

    console.log("Usuario en sesión:", req.session.usuario);

    if(web){
        res.redirect("/perfil")
    }else{
        res.setHeader('Content-Type','application/json');

    return res.status(200).json({ payload: "Login correcto!", usuario })
}

})

router.get('/logout', async (req, res) => {
    req.session.destroy(e => {
        if (e) {
            console.log(error);
            res.setHeader('Content-Type', 'application/json');
            return res.status(500).json(
                {
                    error: `Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
                    detalle: `${error.message}`
                }
            )

        }
    })

    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({ payload: "Logout Exitoso...!!!" });
})