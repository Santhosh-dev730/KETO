const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, required: true},
  username: String,
  email: { type: String, unique: true },
  password: String,
  isLoggedIn: { type: Boolean, default: false }, 
});

const User = mongoose.model('User', userSchema);

// Cart Schema
const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  productItems: [
    {
      productId: { type: Number, required: true },
      title: { type: String, required: true },
      description: { type: String, required: true },
      image: {type: String, required: true},
      price: { type: Number, required: true },
      quantity: { type: Number, default: 1, min: 1 },
      addedAt: { type: Date, default: Date.now }
    }
  ]
});

const Cart = mongoose.model('Cart', cartSchema);

// Shipping 

const shippingSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Types.ObjectId, 
    required: true,
  },
  fullName: String,
  phone: String,
  address: String,
  state: String,
  pincode: String
});

const Shipping = mongoose.model('shipping', shippingSchema);

// Order Schema
const orderSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  pincode: {
    type: String,
    required: true
  },
  items: [
    {
      productId: Number,
      title: String,
      description: String,
      image: String,
      price: Number,
      quantity: Number
    }
  ],
  subtotal: {
    type: Number,
    required: true
  },
  shipping: {
    type: Number,
    required: true
  },
  grandTotal: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ["Placed", "Processing", "Shipped", "Delivered", "Cancelled"],
    default: "Placed",
    required: true
  },
  placedAt: {
    type: Date,
    default: Date.now
  }
});


const Order = mongoose.model("Order", orderSchema);

module.exports = {
  User,
  Order,
  Cart,
  Shipping
};