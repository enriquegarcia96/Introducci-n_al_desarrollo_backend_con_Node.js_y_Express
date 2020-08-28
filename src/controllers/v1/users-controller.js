//* importo el paquere bcrypt
const bcrypt = require('bcrypt');
const Users = require('../../mongo/models/users'); //para guardar los datos a mongo

const createUser = async (req, res) => {
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

const deleteUsers = (req, res) => {
  res.send({ status: 'OK', message: 'user delete' });
};

//retorna todos los usuarios registrados
const getUsers = (req, res) => {
  res.send({ status: 'OK', data: [] });
};

//ruta para actualizar la informacion de un usuario
const updateUsers = async (req, res) => {
  try {
    const { username, email, data, userId } = req.body;
    await Users.findOneAndUpdate(userId, {
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
module.exports = {
  createUser,
  deleteUsers,
  getUsers,
  updateUsers,
};
