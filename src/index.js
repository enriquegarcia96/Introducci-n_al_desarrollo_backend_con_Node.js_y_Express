//* migro el codigo puro de NODEJS a un codigo compatible con express
const express = require('express')//nombre del paquete de express (package.json)
const bodyParser = require('body-parser')//paquete de body-parser


//* importo las rutas de version 1
const routesv1 = require('./routes/v1')

const app = express()//aqui ya creo una aplicacion de express

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
//habilito el consumo de APIs utilizando  application/json
app.use(bodyParser.json())

routesv1(app) // le paso la aplicacion de express


//le difino la ruta por default con expressJS tipo get
app.listen(4000, () => {
     console.log('corriendo en 4000')
})

