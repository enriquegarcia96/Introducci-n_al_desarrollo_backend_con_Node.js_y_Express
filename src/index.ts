import express, { Application } from 'express';
// const express = require('express'); // importo express con TS

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import routesv1 from './routes/v1';
/*
const bodyParser = require('body-parser'); //paquete de body-parser
const dotenv = require('dotenv');
const mongoose = require('mongoose'); //paquete de mongoose
*/

//configuro las variables de entorno
dotenv.config();

declare global {
  namespace Express {
    export interface Request {
      sessionData: any;
    }
  }
}

//aplicacion de express
const app: Application = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
//habilito el consumo de APIs utilizando  application/json
app.use(bodyParser.json());

routesv1(app); // le paso la aplicacion de express

//hago que mi puerto de ejecucion de mi aplicacion salga de mis
//variables de entorno
const PORT: number | String = process.env.PORT || 4000; // o cuando no defina una variable de entorno

//mi string de conexion para conectarme con Mongosee(process.env.mongo)
mongoose
  .connect(process.env.MONGO!, {
    //con el signo de "!" le digo que esto siempre sera un String
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
