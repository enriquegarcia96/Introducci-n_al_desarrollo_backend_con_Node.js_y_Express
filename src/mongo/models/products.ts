import { Document, model, Schema } from 'mongoose';
import { IUser } from './users';

export interface IProduct extends Document {
  title: string;
  desc: string;
  price: number;
  images: string[];
  user: IUser | string;
}

//defino el esquema para los usuarios
const productSchema: Schema = new Schema(
  {
    //defino las propiedades de nuestro usuarios
    title: { type: String, required: true }, //le digo el tipo de dato y valido el campo
    desc: { type: String, required: true },
    price: { type: Number, required: true },
    images: { type: [{ type: String, require: true }], default: [] }, //una imagen por defecto

    //para saber que el usuario creo el producto
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, //ref=> tiene que councidir con el modelo de user
  },
  {
    //con la fecha que se actualizo el producto
    timestamps: true,
  }
);

//creo el modelo
//user es el nombre del modelo y se utiliza para crear la coleccion MONGODB
export default model<IProduct>('Product', productSchema);

//exporto el modelo

//module.exports = model;
