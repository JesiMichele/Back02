import { request, response } from "express";
import { productModel } from "../../dao/models/products.js";
import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

// Aplicar el plugin de paginación a tu modelo de producto
//productModel.plugin(mongoosePaginate);

/*export const getProducts = async (req = request, res = response) => {
    try {
        
        let { limit = 10, page = 1, sort, query } = req.query;
        page = page === 0 ? 1 : page; // Paginación
        page = Number(page);
        limit = Number(limit);
        
        // Opciones de paginación
        const options = {
            page: page,
            limit: limit
        };

        // Ordenamiento
        const sortOrder = { 'asc': 1, 'desc': -1 };
        sort = sortOrder[sort] || null;
        if (sort) {
            options.sort = { price: sort };
        }

        // Filtrado
        try {
            if (query) {
                query = JSON.parse(decodeURIComponent(query));
            }
        } catch (error) {
            query = {};
        }

        // Realizar la consulta utilizando la paginación de Mongoose
        const result = await productModel.paginate(query, options);

        // Calcular hasNextPage y hasPrevPage
        const hasNextPage = result.page < result.totalPages;
        const hasPrevPage = result.page > 1;

        // Retornar resultado con información adicional
        return {
            hasNextPage: hasNextPage,
            hasPrevPage: hasPrevPage,
            limit: limit,
            sort: sort,
            skip: (page - 1) * limit,
            payload: productos,
            ...result
        };
    } catch (error) {
        console.log('getProducts ->', error);
        return res.status(500).json({ msg: 'Comunicarse con un administrador' });
    }
}*/



export const getProducts = async ({limit = 10, page = 10, sort, query}) => {
    try {
        //let { limit = 10, page = 1, sort, query } = req.query;
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
        
      
        return b;
        
        


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

