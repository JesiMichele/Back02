import { request, response } from "express";
import { productModel } from "../dao/models/products.js";



// obtener una lista de productos. Utiliza la paginación para devolver un número específico de productos por página
//page para paginacion, sort para asc o desc, query para filtrado

export const getProducts = async (req = request, res = response) => {
    try {
        let { limit = 2, page = 1, sort, query } = req.query;
        page = page === 0 ? 1 : page;// Paginacion
        page = Number(page);
        limit = Number(limit);
        const skip = (page - 1) * limit;

        const sortOrder = { 'asc': -1, 'desc': 1 };
        sort = sortOrder[sort] || null;

        try {
            if (query)
                query = JSON.parse(decodeURIComponent(query))

        } catch (error) {
            query = {}
        }

        const queryProducts = productModel.find(query).limit(limit).skip(skip);
        if (sort !== null)
            queryProducts.sort({ price: sort });

        
        const [productos, totalDocs] = await Promise.all([queryProducts, productModel.countDocuments(query)]);

        const totalPages = Math.ceil(totalDocs / limit);
        const hasNextPage = page < totalPages;
        const hastPrevPages = page > 1;
        const prevPage = hastPrevPages ? page - 1 : null;
        const nextPage = hasNextPage ? page + 1 : null;
        const b = {

            totalDocs,
            totalPages,
            limit,
            hasNextPage,
            hastPrevPages,
            prevPage,
            nextPage,
            payload: productos,

        }














        return res.json({ b });//Se devuelve una respuesta JSON con los detalles de paginación y la lista de productos obtenida.


    } catch (error) {
        console.log('getProducts ->', error);
        return res.status(500).json({ msg: 'Comunicarse con un administrador' });
    }
}


//obtener prod por su ID
export const getProductById = async (req = request, res = response) => {
    try {
        const { pid } = req.params;
        const producto = await productModel.findById(pid);//buscar prod en la BD por u iD
        if (!producto)
            return res.status(404).json({ msg: `El producto con id ${pid} no existe` })

        return res.json({ producto });
    } catch (error) {
        console.log('getProductById ->', error);
        return res.status(500).json({ msg: 'Comunicarse con un administrador' });
    }
}

//agregar nuevo prod a la BD
export const addProduct = async (req = request, res = response) => {
    try {
        const { title, description, price, thumbnails, code, stock, category, status } = req.body;
        //validacion de campos obligatorios
        if (!title, !description, !price, !thumbnails, !code, !stock, !category)
            return res.status(404).json({ msg: `Los campos [title, description, price, thumbnails, code, stock, category] son obligatorios` })
        
        // crear un nuevo documento de producto en la BD
        const producto = await productModel.create({ title, description, price, thumbnails, code, stock, category, status })
        return res.json({ producto });
    } catch (error) {
        console.log('addProduct ->', error);
        return res.status(500).json({ msg: 'Comunicarse con un administrador' });
    }
}



//Actualizar producto existente
export const updateProduct = async (req = request, res = response) => {
    try {
        const { pid } = req.params
        const { id, ...rest } = req.body;
        const producto = await productModel.findByIdAndUpdate(pid, { ...rest }, { new: true });//buscar y actualizar el producto por su ID y devolver la versión actualizada del producto
         
        if (producto)
            return res.json({ msg: 'Producto actualizado', producto });
        return res.status(404).json({ msg: `No se pudo actualizar el producto con id ${pid}` });
    } catch (error) {
        console.log('updateProduct ->', error);
        return res.status(500).json({ msg: 'Comunicarse con un administrador' });
    }
}






// Eliminar prod existente de la BD

export const deleteProduct = async (req = request, res = response) => {
    try {
        const { pid } = req.params
        const producto = await productModel.findByIdAndDelete(pid);//buscar y eliminar prod por su ID
        if (producto)
            return res.json({ msg: 'Producto eliminado', producto });
        return res.status(404).json({ msg: `No se pudo eliminar el producto con id ${pid}` });
    } catch (error) {
        console.log('deleteProduct ->', error);
        return res.status(500).json({ msg: 'Comunicarse con un administrador' });
    }
}

