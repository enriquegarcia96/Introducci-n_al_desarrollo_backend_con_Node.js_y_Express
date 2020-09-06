import { Request, Response } from 'express';

import Products from '../../mongo/models/products';

const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    //le paso las propiedades
    const { title, desc, price, images, userId } = req.body;

    //creo el producto de mongoDB
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

const getProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    //recupero todos los productos de la base
    //retorna todos los productod de MONGO y populate retorna  los datos que necesito del USER
    const product = await Products.find({
      price: { $gt: 10 }, //filtar por mayores de 10 de precio
    })
      .select('title desc price')
      .populate('user', 'username email data role');

    res.send({ status: 'OK', data: product });
  } catch (error) {
    console.log('Error create Producto: ', error);

    res.status(500).send({ status: 'ERROR', data: error.message });
  }
};

//obtener producto de un usario en especifico
const getProductByUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Products.find({
      user: req.params.userId, //le filtro el usuario como un objeto(object)
    });

    res.send({ status: 'OK', data: product });
  } catch (error) {
    console.log('Error create Producto: ', error);

    res.status(500).send({ status: 'ERROR', data: error.message });
  }
};

export default {
  createProduct,
  getProduct,
  getProductByUser,
};
