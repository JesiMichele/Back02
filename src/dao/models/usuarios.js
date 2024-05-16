import mongoose from "mongoose";


const usuariosModelo=new mongoose.Schema({
    nombre: String,
    email: {
        type: String, unique: true
    },
    password: String
})

export const usuarioModelo= mongoose.model('usuarios',usuariosModelo)