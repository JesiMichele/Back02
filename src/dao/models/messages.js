import { Schema, model } from 'mongoose';

const newCollection = 'Message';//coleccion en mongo DB

const MessageSchema = new Schema({ //esquema de la coleccion y sus valores
    user: { type: String, required: [true, 'El nombre del usuario es obligatorio'] },
    message: { type: String, required: [true, 'El mensaje es obligatorio'] }
});


export const messageModel = model(newCollection, MessageSchema);