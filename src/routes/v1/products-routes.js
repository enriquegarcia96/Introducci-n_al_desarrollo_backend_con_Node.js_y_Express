/**
 * defino todas las rutas que se van a comunicar con el controlador product.js
 */
const express = require('express');
const productController = require('../../controllers/v1/products-controller');
const router = express.Router();

router.post('/create', productController.createProduct);
router.get('/get-all', productController.getProduct);
router.get('/get-by-user/:userId', productController.getProductByUser);

module.exports = router;
