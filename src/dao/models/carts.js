import { Schema, model } from 'mongoose';

const newCollection = 'Carts';

const CartSchema = new Schema({

    products: [{

        id: {
            type: Schema.Types.ObjectId,
            ref: 'Producto'
        },
        quantity: {
            type: Number,
            required: [true, 'La cantidad del producto es obligatoria']
        }




    }]
});


CartSchema.set('toJSON', {
    transform: function (doc, ret) {
        delete ret.__v;
        return ret;
    }
})

export const CartModel = model(newCollection, CartSchema);