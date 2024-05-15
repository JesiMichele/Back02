import { request, response } from "express";
import { productModel } from "../../dao/models/products.js";

export const getProducts = async (req = request, res = response) => {
    try {
        
        let { limit = 10, page = 1, query, sort } = req.query;
        limit = Number(limit);
        page = Number(page);//paginacion

        // Filtrado
        const filt = {};
        if (query) {
            
            filt.category = query; 
        }

        // Ordenamiento
        const sortOrder = {};
        if (sort) {
            sortOrder.price = sort === "asc" ? 1 : sort === "desc" ? -1 : 0;
        }

        // Consulta  total de documentos
        const result = await productModel.countDocuments(filt);

        // Consulta para obtener productos por paginación y ordenamiento
        const skip = (page - 1) * limit;
        const productos = await productModel.find(filt)
            .limit(limit)
            .skip(skip)
            .sort(sortOrder);

        // Resultado de respuesta
        const totalPages = Math.ceil(result / limit);
        const hasNextPage = page < totalPages;
        const hasPrevPage = page > 1;
        const prevPage = hasPrevPage ? page - 1 : null;
        const nextPage = hasNextPage ? page + 1 : null;
        const prevLink = hasPrevPage ? `/products?page=${prevPage}&limit=${limit}&query=${query}&sort=${sort}` : null;
        const nextLink = hasNextPage ? `/products?page=${nextPage}&limit=${limit}&query=${query}&sort=${sort}` : null;

        return res.json({
            status: "success",
            payload: productos,
            totalPages,
            prevPage,
            nextPage,
            page,
            hasPrevPage,
            hasNextPage,
            prevLink,
            nextLink
        });

    } catch (error) {
        console.error(' getProducts:', error);
        return res.status(500).json({ msg: 'Comunicarse con un administrador.' });
    }
};



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

