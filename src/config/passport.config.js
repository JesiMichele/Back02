import passport from "passport";
import local from "passport-local"
import github from "passport-github2"
import { UsuariosManagerMongo } from "../public/js/UsuariosManager.js";
import { CartManager } from "../dao/CartManager.js";
import { generarHash } from "../utils.js";

const usuariosManager= new UsuariosManagerMongo()
const cartManager= new CartManager()

export const initPassport = ()=>{
    passport.use(
        "registro",
        new local.Strategy(
            {
                passReqToCallback: true,
                usernameField: "email"
            },
            async(req, username, password, done)=>{
                try{
                
                    let {nombre}= req.body
                    if(!nombre)

                    return done(null,false)

                    let existe=usuariosManager.getBy({email: username})
                    if(existe)

                    return done (null, false)
                    //validaciones campos
                    //hashear contraseña grabar usuario


                    let nuevoCarrito= await cartManager.create()
                    password= generarHash(password)

                    let usuario= await usuariosManager.create({nombre, email: username, password,carrito: nuevoCarrito._id})
                
                return done(null, false )
                
                }catch(error){
                return done(error)
                }
            
            }
        )
    )
    passport.serializeUser((usuario, done )=>{
        return done(null,usuario._id)
    })

    passport.deserializeUser(async(id,done)=>{
        let usuario= await usuariosManager.getBy({_id:id})
        return done(null,usuario)
    })
}