import mongoose from "mongoose";


const usuariosModelo=new mongoose.model('usuarios', new mongoose.Schema({
    nombre: String,
    email: {
        type: String, unique: true
    },
    password: String,
    rol:{
        type:String, default: "user"
    },
    carrito:{
        type: mongoose.Types.ObjectId, ref : "carritos"
    }
}))

export const usuarioModelo= mongoose.model('usuarios',usuariosModelo)