const Products = require('../../mongo/models/products')

const createProduct = async (req, res) =>{
     try {
          //le paso las propiedades
          const {title, desc, price, images, userId} = req.body
          
          //creo el producto
          const product =  await Products.create({
               title,
               desc,
               price,
               images,
               user: userId
          })
          // en caso que se cree correctamente, le mando la respuesta
          res.send({status: 'OK', data: product})
     } catch (error) {
          console.log('createProduct error: ', error)
          res.status(500).send({ status: 'ERROR', data: error.message })
          
     }



}    

const deleteProduct = (req,res) =>{

}

const getProduct = (req, res) =>{

}

module.exports = {
     createProduct,
     deleteProduct,
     getProduct
}