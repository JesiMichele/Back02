import fs from 'fs';
import ProductManager from './ProductManager.js';


class CartsManager {
    #carts;
    #path



    constructor() {

        this.#path = './src/cart.json';
        this.#carts = this.#leerCarritoArchivo();
    }

    definirIdCart() {
        let id = 1;
        if (this.#carts.length != 0)
            id = this.#carts[this.#carts.length - 1].id + 1;
        return id;

    }
    #leerCarritoArchivo() {
        try {
            if (fs.existsSync(this.#path))
                return JSON.parse(fs.readFileSync(this.#path, 'utf-8'));
            return [];
        }
        catch (error) {
            console.log(`Error al leer el archivo, ${error}`);

        }
    }

    createCart() {
        const newCart = {
            id: this.definirIdCart(),
            products: []
        };
        this.#carts.push(newCart);
        this.guardarArchivo();

        return (newCart);
    }

    guardarArchivo() {
        try {
            fs.writeFileSync(this.#path, JSON.stringify(this.#carts));
        }
        catch (error) {
            console.log(`Error al guardar el archivo, ${error}`);
        }
    }

    addProductCart(cid, pid) {
        let result = `El id ${cid} no existe`;
        const indexCart = this.#carts.findIndex(c => c.id === cid);

        if (indexCart !== -1) {
            const cart = this.#carts[indexCart];
            const indexProdCart = cart.products.findIndex(p => p.id === pid);

            const productManager = new ProductManager();
            const product = productManager.getProductById(pid);

            if (product && indexProdCart === -1) {
                cart.products.push({ id: pid, 'quantity': 1 });
                this.guardarArchivo();
                result = 'Producto agregado al carrito exitosamente!';
            } else if (product && indexProdCart !== -1) {
                cart.products[indexProdCart].quantity++;
                this.guardarArchivo();
                result = 'Producto agregado al carrito exitosamente!';
            }
        }

        return result;
    }

    getCartById(id) {
        const producto = this.#carts.find(p => p.id == id);

        if (producto)
            return producto;

        else
            return `Not Found`
    }




}


export default CartsManager;