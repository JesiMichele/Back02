const fs = require('fs')


class ProductManager {
    #products;
    #path
    static idProducto = 0;

    constructor() {

        this.#path = './src/productos.json';
        this.#products = this.#leerProductoArchivo();
    }

    definirIdProducto() {
        let id = 1;
        if (this.#products.length != 0)
            id = this.#products[this.#products.length - 1].id + 1;
        return id;

    }
    #leerProductoArchivo() {
        try {
            if (fs.existsSync(this.#path))
                return JSON.parse(fs.readFileSync(this.#path, 'utf-8'));
            return [];
        }
        catch (error) {
            console.log(`Error al leer el archivo, ${error}`);

        }
    }

    addProduct(tittle, description, price, thumbnail, code, stock) {

        if (!tittle || !description || !price || !thumbnail || !code || !stock)
            return `Todos los parametros son solicitados[tittle,description,price,thumbnail,code,stock]`

        const codeExistente = this.#products.find(p => p.code == code);

        if (codeExistente)
            return `El codigo ${code}ya existe`

        ProductManager.idProducto = ProductManager.idProducto + 1;

        const id = this.definirIdProducto();


        const newProduct = {
            id,
            tittle,
            description,
            price,
            thumbnail,
            code,
            stock
        };

        this.#products.push(newProduct);
        this.guardarArchivo();

        return `Producto agregado con exito!`
    }

    guardarArchivo() {
        try {
            fs.writeFileSync(this.#path, JSON.stringify(this.#products));
        }
        catch (error) {
            console.log(`Error al guardar el archivo, ${error}`);
        }
    }

    getProduct(limit=0) {
        limit=Number(limit)

        if(limit > 0){
            return this.#products.slice (0,limit);
        }else{
            return this.#products;
        }

        
        
    }

    getProductById(id) {
        const producto = this.#products.find(p => p.id == id);

        if (producto)
            return producto;

        else
            return `Not Found`
    }

    updateProduct(id, propiedadesProducto) {
        let mensaje = `El producto con id ${id} no existe!`
        const indice = this.#products.findIndex(p => p.id === id);//buscar por id

        if (indice >= 0) {
            const { id, ...rest } = propiedadesProducto;//extraer id y el resto de propiedades
            this.#products[indice] = { ...this.#products[indice], ...rest };// tomar el producto que me devuelve indice, me devuelva las propiedades (indice) y sobreescriba las propiedades que ya existen o no
            this.guardarArchivo();//se guarda el archivo
            mensaje = `Producto actualizado!`
        }
    }

    deleteProduct(id) {

        let mensaje = `El producto con id ${id} no existe!`

        const indice = this.#products.findIndex(p => p.id === id);//buscar por id

        if (indice >= 0) {
            this.#products = this.#products.filter(p => p.id !== id);//filtrado y [] actualizado
            this.guardarArchivo();//guardar el producto actualizado
            mensaje = `Producto eliminado!`
        }
        return mensaje;

        return mensaje;
    }
}


module.exports = ProductManager;