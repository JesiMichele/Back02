import mongoose from 'mongoose';


export const dbConecction = async () => {
    try {
        await mongoose.connect('mongodb+srv://jesimichele:232922Jl@cluster0.yrvuwzn.mongodb.net/ecommerce')

        console.log('bd en ejecucion')
    } catch (error) {        
        console.log(`Error en la bd ${error}`);
        process.exit(1)
    }
}//Conexion a BD de MongoDb utilizando Mongoose




//pruebaBack02 le cambie :
//saque los controllers y cree en public carts manager(funciona bien en postamn )
//tambien prodmanager, no anda el getproducts , los otros si. 
//tengo qe modificar bien las rutas, pagination y ruta de carrito en vista y si tengo tiempo me rajo un tiro