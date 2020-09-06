import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  password: string;
  email: string;
  data: {
    age: number;
    isMale: boolean;
  };
  role: string;
}

//defino el esquema para los usuarios
const userSchema: Schema = new Schema({
  //defino las propiedades de nuestro usuarios
  username: { type: String, required: true, unique: true }, //le digo el tipo de dato y valido el campo
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true }, //unique sera un correo unico
  data: {
    type: { age: Number, isMale: Boolean },
  },

  //el tipo de rol que se aceptaran y por defecto el usuario creado
  role: { type: String, enum: ['admin', 'seller'], default: 'seller' },
});

export default model<IUser>('User', userSchema);

//creo el modelo
//user es el nombre del modelo y se utiliza para crear la coleccion MONGODB
// const model = mongoose.model('User', userSchema);

//exporto el modelo
// module.exports = model;
