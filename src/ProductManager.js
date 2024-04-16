import fs from 'fs';



class ProductManager {
    #products;
    #path



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

    addProduct({ title, description, price, thumbnail = [], code, stock, category, status = true }) {

        let result = 'Ha ocurrido un error';


        if (!title || !description || !price || !code || !stock || !category)
            result = `Todos los parametros son solicitados[title,description,price,code,stock, category]`
        else {
            const codeExistente = this.#products.find(p => p.code == code);

            if (codeExistente)
                result = `El codigo ${code}ya existe`

            else {


                const id = this.definirIdProducto();


                const newProduct = {
                    id,
                    title,
                    description,
                    price,
                    thumbnail,
                    code,
                    stock,
                    category,
                    status
                };

                this.#products.push(newProduct);
                this.guardarArchivo();

                result = {
                    mensaje: `Producto agregado con exito!`,

                    producto: newProduct
                }
            }
        }
        return result;
    }

    guardarArchivo() {
        try {
            fs.writeFileSync(this.#path, JSON.stringify(this.#products));
        }
        catch (error) {
            console.log(`Error al guardar el archivo, ${error}`);
        }
    }

    getProduct(limit = 0) {
        limit = Number(limit)

        if (limit > 0) {
            return this.#products.slice(0, limit);
        } else {
            return this.#products;
        }



    }

    getProductById(id) {
        let status = false;
        let r = `El producto con id ${id} no existe`;

        const producto = this.#products.find(p => p.id == id);

        if (producto) {
            status = true;
            r = producto;
        }


        return { status, r };
    }

    updateProduct(id, propiedadesProducto) {
        let result = `El producto con id ${id} no existe!`
        const indice = this.#products.findIndex(p => p.id === id);//buscar por id

        if (indice >= 0) {
            const { id, ...rest } = propiedadesProducto;//extraer id y el resto de propiedades
            const permisos = ['title', 'description', 'price', 'thumbnails', 'code', 'stock', 'category'];

            //Propiedades permitidas
            const actualizacion = Object.keys(rest)//obtener las propiedades y devolverlas en un []
                .filter(propiedad => permisos.includes(propiedad))//filtrado del [], se verifica con las prop permitidas, para actualizar el producto
                .reduce((obj, key) => {// crear un nuevo objeto con las prop permitidas
                    obj[key] = rest[key]
                    return obj;//devuelve el obj actualizado como resultado del reduce
                }, {});
            this.#products[indice] = { ...this.#products[indice], ...actualizacion };// tomar el producto que me devuelve indice, me devuelva las propiedades (indice) y sobreescriba las propiedades que ya existen o no
            this.guardarArchivo();//se guarda el archivo
            result = {
                mensaje: `Producto actualizado!`,
                producto: this.#products[indice]
            }
            return result;
        }
    }

    deleteProduct(id) {

        let result = `El producto con id ${id} no existe!`

        const indice = this.#products.findIndex(p => p.id === id);//buscar por id

        if (indice >= 0) {
            this.#products = this.#products.filter(p => p.id !== id);//filtrado y [] actualizado
            this.guardarArchivo();//guardar el producto actualizado
            result = `Producto eliminado!`
        }
        return result;


    }
}


export default ProductManager;