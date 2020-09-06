import express from 'express';

//* defino todas las rutas que se van a comunicar con el controlador users.js
import { isAuth, isValidHostname, isAdmin } from '../../middlewares/auth';
import usersController from '../../controllers/v1/users-controller';

const router = express.Router();

//creo mis rutas de tipo get,post,delete,put para nuestros usuarios
router.post('/login', usersController.login);
router.post('/create', usersController.createUser);
router.post('/update', isValidHostname, isAuth, usersController.updateUsers);
router.post('/delete', isAuth, isAdmin, usersController.deleteUsers);
router.get('/get-all', isAuth, isAdmin, usersController.getUsers);

//exporto mi router
export default router;
