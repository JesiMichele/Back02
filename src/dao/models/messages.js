import { Schema, model } from 'mongoose';

const newCollection = 'Message';

const MessageSchema = new Schema({
    user: { type: String, required: [true, 'El nombre del usuario es obligatorio'] },
    message: { type: String, required: [true, 'El mensaje es obligatorio'] }
});


export const messageModel = model(newCollection, MessageSchema);