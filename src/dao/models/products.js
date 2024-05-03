import { Schema, model } from 'mongoose';

const newCollection = 'Producto';

const ProductoSchema = new Schema({

    title: { type: String, required: [true, 'El titulo es obligatorio'] },
    description: { type: String, required: [true, 'La descripcion del producto es obligatoria'] },
    price: { type: Number, required: [true, 'El precio del producto es obligatorio'] },
    thumbnail: [{ type: String }],
    code: { type: Number, required: [true, 'El codigo del producto es obligatorio'], unique: true },
    stock: { type: Number, required: [true, 'El stock del producto es obligatorio'] },
    category: { type: String, required: [true, 'La categoria del producto es obligatoria'] },
    status: { type: Boolean, default: true },
});

ProductoSchema.set('toJSON', {
    transform: function (doc, ret) {
        delete ret.__v;
        return ret;
    }
})
export const productModel = model(newCollection, ProductoSchema);