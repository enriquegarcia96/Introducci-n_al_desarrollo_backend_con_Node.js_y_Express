const mongoose = require('mongoose')
// const schema = mongoose.Schema
const {Schema} = mongoose

//defino el esquema para los usuarios
const productSchema = new Schema({
     //defino las propiedades de nuestro usuarios
     title: {type: String , required:true},//le digo el tipo de dato y valido el campo
     desc: {type: String, required: true},
     price: {type: Number, required: true},
     images: {type: [{type: String, require: true}], default: []},//una imagen por defecto

     //para saber que el usuario creo el producto
     user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}//ref=> tiene que councidir con el modelo de user
},{
     //con la fecha que se actualizo el producto
     timestamps: true 
})


//creo el modelo
//user es el nombre del modelo y se utiliza para crear la coleccion MONGODB
const model = mongoose.model('Product', productSchema)

//exporto el modelo
module.exports = model