import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

import Users from '../../mongo/models/users';
import Product from '../../mongo/models/products';

const expiresIn = 60 * 10;

//metodo de seguridad a nuestra API
const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    //findOne me retorna el primer usuario que coincida con mi busqueda
    const user = await Users.findOne({ email });
    if (user) {
      //comprueba que la contraseña sea correcta
      const isOK = await bcrypt.compare(password, user.password); //user.pass es el hass que esta almacenado en mi base
      if (isOK) {
        //* genero un token firmado con JWTSECRET
        const token = jwt.sign(
          { userId: user._id, role: user.role },
          process.env.JWT_SECRET!,
          { expiresIn }
        ); //con esto genero un  token el cual almacena el userID y el role del usuario

        res.send({ status: 'OK', data: { token, expiresIn } });
      } else {
        res.status(403).send({ status: 'INVALID PASSWORD', message: '' });
      }
    } else {
      res.status(401).send({ status: 'USER NOT FOUND', message: '' });
    }
  } catch (error) {
    res.status(500).send({ status: 'ERROR', message: error.message });
  }
};

const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('rep.body', req.body);

    //obtengo los datos del cuerpo de la  peticion
    const { username, email, password, data } = req.body; //obtengo el parametro username del body
    // const {email} = req.body

    //para usar bcrypt
    //await, que primero me haga la encriptacion y despues me mande la respuesta
    const hash = await bcrypt.hash(password, 15);

    //* guardo los datos del usuario en la base de MONGO
    // await Users.create({//le paso las propiedades del modelo users

    //      //si el nombre del keyword, coincide con el nombre de la propiedad
    //      username,//username: username,//le asigno el valor que obtengo de la peticion
    //      email,
    //      data,
    //      password: hash//le paso el hash al pass, porque no puedo ponerlo como texto plano en MONGO
    // })

    //* otra manera de guardar datos en MONGO
    const user = new Users();
    user.username = username;
    user.email = email;
    user.password = hash;
    user.data = data;

    await user.save(); //envio la constante user

    //accion para guardar un usuario en una base de datos
    res.send({ status: 'OK', message: 'user create' });
  } catch (error) {
    //para
    if (error.code && error.code === 11000) {
      res
        .status(400)
        .send({ status: 'DUPLICATED_VALUES', message: error.keyValue });
      return;
    }

    console.log('error createuser', error);
  }
};

const deleteUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.body; //obtengo el userID en el cuerpo de la peticion
    //console.log('userID: ', userId);

    if (!userId) {
      //en caso que no se obtenga el UserID
      throw new Error('missing param userID');
    }

    await Users.findByIdAndDelete(userId);

    //cuando se elimine un usuario tambien se elimine los productos vinculados a ese usuario
    await Product.deleteMany({ user: userId }); //si user == userID (es valida porque en mongo/models esta la propiedad que acepta un ObjectID )

    res.send({ status: 'OK', message: 'user delete' });
  } catch (error) {
    res.status(500).send({ status: 'ERROR', message: error.message });
  }
};

//retorna todos los usuarios registrados
const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    //retonar todos los usuarios, solo con los campos que quiero que se muestre
    const user = await Users.find().select({ password: 0, __v: 0, role: 0 });
    res.send({ status: 'OK', data: user });
  } catch (error) {
    res.status(500).send({ status: 'ERROR', message: error.message });
  }
};

//ruta para actualizar la informacion de un usuario
const updateUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('req.sessionData', req.sessionData.userId);
    const { username, email, data } = req.body;
    await Users.findByIdAndUpdate(req.sessionData.userId, {
      username,
      email,
      data,
    });
    res.send({ status: 'OK', message: 'user update' });
  } catch (error) {
    if (error.code && error.code === 11000) {
      res
        .status(400)
        .send({ status: 'DUPLICATED_VALUES', message: error.keyValue });
      return;
    }
    res.status(500).send({ status: 'ERROR', message: 'user update' });
  }
};

//exporto la funcion dentro de un object
export default { createUser, deleteUsers, getUsers, updateUsers, login };
