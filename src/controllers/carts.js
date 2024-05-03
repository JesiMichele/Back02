import { request, response } from "express";
import { CartModel } from "../dao/models/carts.js";

export const getCartById = async (req = request, res = response) => {
    try {
        const { cid } = req.params;
        const carrito = await CartModel.findById(cid);

        if (carrito)
            return res.json({ carrito })

        return res.status(404).json({ msg: `El carrito con id ${cid}no existe` })
    } catch (error) {
        console.log('getCartById ->', error);
        return res.status(500).json({ msg: 'Comunicarse con un administrador' });

    }
}




export const createCart = async (req = request, res = response) => {
    try {
        const carrito = await CartModel.create({});
        return res.json({ msg: 'Carrito creado', carrito });
    } catch (error) {
        console.log('createCartById ->', error);
        return res.status(500).json({ msg: 'Comunicarse con un administrador' });

    }
}

export const addProductCart = async (req = request, res = response) => {
    try {
        const { cid, pid } = req.params;

        const carrito = await CartModel.findById(cid);
        if (carrito)
            return res.status(404).json({ msg: `El carrito con id ${cid}no existe` });

        const productInCart = carrito.products.find(p => p.id.toString() === pid)


        if (productInCart)
            productInCart.quantity++;
        else
            carrito.products.push({ id: pid, quantity: 1 })

        carrito.save();
        return res.json({ msg: 'Carrito actualizado', carrito });


    } catch (error) {
        console.log('addProductCart ->', error);
        return res.status(500).json({ msg: 'Comunicarse con un administrador' });

    }
}