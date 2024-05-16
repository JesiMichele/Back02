import { CartModel } from "./models/carts.js"

export class CartManager{
    async getAll(){
        return CartModel.find().lean()
    }

    async getOneBy(filtro={}){
        return await CartModel.findOne(filtro).lean()
    }

    async getOneByPopulate(filtro={}){
        return await CartModel.findOne(filtro).populate("productos.producto").lean()
    }

    async create(){
        let carrito=await CartModel.create({productos:[]})
        return carrito.toJSON()
    }

    async update(id, carrito){
        return await CartModel.updateOne({_id:id}, carrito)
    }
}