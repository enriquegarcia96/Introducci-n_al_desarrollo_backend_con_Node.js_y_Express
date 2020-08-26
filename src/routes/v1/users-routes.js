//* defino todas las rutas que se van a comunicar con el controlador users.js
const express = require('express')

const usersController = require('../../controllers/v1/users-controller')

const router = express.Router()

//creo mis rutas de tipo get,post,delete,put
router.post('/create', usersController.createUser)
router.post('/update', usersController.updateUsers)
router.post('/delete', usersController.deleteUsers)
router.get('/get-all', usersController.getUsers)

//exporto mi router
module.exports = router