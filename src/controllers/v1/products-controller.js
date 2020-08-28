const Products = require('../../mongo/models/products');

const createProduct = async (req, res) => {
  try {
    //le paso las propiedades
    const { title, desc, price, images, userId } = req.body;

    //creo el producto
    const product = await Products.create({
      title,
      desc,
      price,
      images,
      user: userId,
    });
    // en caso que se cree correctamente, le mando la respuesta
    res.send({ status: 'OK', data: product });
  } catch (error) {
    console.log('createProduct error: ', error);
    res.status(500).send({ status: 'ERROR', data: error.message });
  }
};

const deleteProduct = (req, res) => {};

const getProduct = async (req, res) => {
  try {
    //recupero todos los productos de la base
    //retorna todos los productod de MONGO y populate retorna  los datos que necesito del USER
    const product = await Products.find()
      .select('title desc price')
      .populate('user', 'username email data role');

    res.send({ status: 'OK', data: product });
  } catch (error) {
    console.log('Error create Producto: ', error);

    res.status(500).send({ status: 'ERROR', data: error.message });
  }
};

module.exports = {
  createProduct,
  deleteProduct,
  getProduct,
};
