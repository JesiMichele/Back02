import {usuarioModelo} from "../../dao/models/usuarios.js"

export class UsuariosManagerMongo{


    async create (usuario){

        let nuevoUsuario= await usuarioModelo.create(usuario)
        return nuevoUsuario.toJSON()
    }

    async getBy(filtro ={}){
        return await usuarioModelo.findOne(filtro).lean()
    }

    async getByPopulate(filtro={}){
        return await usuarioModelo.findOne(filtro).populate("carrito").lean()
    }
}
