import express from 'express';
import productController from '../../controllers/v1/products-controller';

/**
 * defino todas las rutas que se van a comunicar con el controlador product.js
 */

const router = express.Router();

router.post('/create', productController.createProduct);
router.get('/get-all', productController.getProduct);
router.get('/get-by-user/:userId', productController.getProductByUser);

export default router;
