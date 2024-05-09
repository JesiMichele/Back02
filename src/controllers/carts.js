import { request, response } from "express";
import { CartModel } from "../dao/models/carts.js";
//obtener carrito por su id
export const getCartById = async (req = request, res = response) => {
    try {
        const { cid } = req.params;
        const carrito = await CartModel.findById(cid).populate('products.id');//busca carrito por su id en la bd

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
        if (!carrito)
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

export const deleteProductsInCart= async (req = request, res = response)=>{
    try{
     const{cid, pid}=req.params;
     const ProdCart= await CartModel.findByIdAndUpdate(cid,{$pull:{'products':{id:pid}}},{new: true});

     if (ProdCart) {
        // Operación exitosa: El producto se eliminó del carrito
        return res.status(200).json({ success: true, message: 'Producto eliminado del carrito con éxito', ProdCart });
    
        
    } else {
        // No se encontró el carrito o el producto en el carrito
        return res.status(404).json({ success: false, message: 'El producto no se encontró en el carrito' });
    }
    
    }catch (error){
        console.log('deleteProductsInCart ->', error);
        return res.status(500).json({ msg: 'Comunicarse con un administrador' });
    }
}


export const updateCart = async (req = request, res = response) => {
    try {
        const { cid } = req.params;
        const { products } = req.body;

        // Verificar si el carrito existe
        const cart = await CartModel.findById(cid);
        if (!cart) {
            return res.status(404).json({ msg: `El carrito con ID ${cid} no existe` });
        }

        // Actualizar el contenido del carrito con el nuevo arreglo de productos
        cart.products = products;

        // Guardar los cambios
        await cart.save();

        return res.status(200).json({ msg: 'Carrito actualizado exitosamente' });
    } catch (error) {
        console.error('updateCart ->', error);
        return res.status(500).json({ msg: 'Error interno del servidor' });
    }
};


export const updateProductQuantityInCart = async (req = request, res = response) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;
        //console.log('Valor de pid:', pid);
        //console.log('Valor de quantity:', quantity);
        

         //Verificar si el carrito existe
        const cart = await CartModel.findById(cid);
        if (!cart) {
            return res.status(404).json({ msg: `El carrito con ID ${cid} no existe` });
        }

        // Encontrar el producto en el carrito
        console.log('Contenido de cart.products:', cart.products);
        const productInCart = cart.products.find(p => p.id.equals(pid));
        if (!productInCart) {
            return res.status(404).json({ msg: `El producto con ID ${pid} no está en el carrito` });
        }

        // Actualizar la cantidad de ejemplares del producto
        productInCart.quantity = quantity;

        // Guardar los cambios
        await cart.save();

        return res.status(200).json({ msg: 'Cantidad de producto actualizada exitosamente' });
    } catch (error) {
        console.error('updateProductQuantityInCart ->', error);
        return res.status(500).json({ msg: 'Error interno del servidor' });
    }















}



export const deleteAllProductsInCart = async (req = request, res = response) => {
    try {
        const { cid } = req.params;

        // Verificar si el carrito existe
        const cart = await CartModel.findById(cid);
        if (!cart) {
            return res.status(404).json({ msg: `El carrito con ID ${cid} no existe` });
        }

        // Establecer el arreglo de productos del carrito como vacío
        cart.products = [];

        // Guardar los cambios
        await cart.save();

        return res.status(200).json({ msg: 'Todos los productos del carrito han sido eliminados exitosamente' });
    } catch (error) {
        console.error('deleteAllProductsInCart ->', error);
        return res.status(500).json({ msg: 'Error interno del servidor' });
    }
};

