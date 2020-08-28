//* migro el codigo puro de NODEJS a un codigo compatible con express
const express = require('express'); //nombre del paquete de express (package.json)
const bodyParser = require('body-parser'); //paquete de body-parser
const dotenv = require('dotenv');
const mongoose = require('mongoose'); //paquete de mongoose

dotenv.config(); //para habilitar la lectura de variables de entorno

//* importo las rutas de version 1
const routesv1 = require('./routes/v1');

const app = express(); //aqui ya creo una aplicacion de express

// console.log('MONGO', process.env.MONGO)//para poder acceder alas variables de entorno

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
//habilito el consumo de APIs utilizando  application/json
app.use(bodyParser.json());

routesv1(app); // le paso la aplicacion de express

//hago que mi puerto de ejecucion de mi aplicacion salga de mis
//variables de entorno
const PORT = process.env.PORT || 4000; // o cuando no defina una variable de entorno

//mi string de conexion (process.env.mongo)
mongoose
  .connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to mongoDB');

    //le difino la ruta por default con expressJS tipo get
    app.listen(PORT, () => {
      console.log(`corriendo en ${PORT} `);
    });
  })
  .catch((error) => {
    console.log('Mongo DB erro ', error);
  });
