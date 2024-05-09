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