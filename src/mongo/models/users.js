const mongoose = require('mongoose');
//const schema = mongoose.Schema;
const { Schema } = mongoose;

//defino el esquema para los usuarios
const userSchema = new Schema({
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

//creo el modelo
//user es el nombre del modelo y se utiliza para crear la coleccion MONGODB
const model = mongoose.model('User', userSchema);

//exporto el modelo
module.exports = model;
