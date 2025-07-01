const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.js');

router.get('/products', adminController.getAllProducts);
router.get('/products/:id', adminController.getProductById);
router.post('/products', adminController.createProduct);
router.patch('/products/:id', adminController.updateProduct);
router.delete('/products/:id', adminController.deleteProduct);


//Admin user and orders
router.get('/users', adminController.getAllUsers)
router.get('/orders', adminController.getAllOrders)
module.exports = router;