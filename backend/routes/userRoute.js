const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.js');

// Auth
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/google-login', userController.googleLogin);
router.post('/api/send-reset-email', userController.sendResetEmail);

// Cart
router.post('/cart', userController.addToCart);
router.get('/cart/:customerId', userController.getCartByCustomerId);
router.delete('/cart/:customerId/all', userController.clearCart); 
router.delete('/cart/:productId', userController.removeCartItem);

// Shipping
router.get('/shipping/:customerId', userController.getShippingAddress);
router.post('/shipping', userController.saveShippingAddress);
router.patch('/shipping/:id', userController.UpdateShippingAddress);

// Orders
router.post('/order', userController.placeOrder);

module.exports = router;
