const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose')
const { User, Order, Cart, Shipping } = require('../models/Schema.js');
const nodemailer = require('nodemailer');



// Send Message to Email
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sandysanthosh345@gmail.com',
    pass: 'mzym cqik jpnh apdr',
  },
});


exports.sendResetEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'Email not found' });

    const mailOptions = {
      from: 'sandysanthosh345@gmail.com',
      to: email,
      subject: 'Password Reset Request',
      text: `Hi ${user.username},\n\nClick the link to reset: http://localhost:5173/reset-password`,
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) return res.status(500).json({ message: 'Failed to send email' });
      return res.status(200).json({ message: 'Email sent' });
    });
  } catch {
    res.status(500).json({ message: 'Internal server error' });
  }
};


// User - Register

exports.register = async (req, res) => {
  const { username, email, password, isLoggedIn } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const customerId = new mongoose.Types.ObjectId();

    const newUser = new User({
      username,
      email,
      password,
      customerId,
      isLoggedIn: isLoggedIn || false
    });

    await newUser.save();
    res.status(201).json({ message: "Registered successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Registration failed" });
  }
};


// User - Login
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user || user.password !== password) {
      return res.status(400).json({ message: "User is not found" });
    }

    // Check if customerId is valid
    if (!user.customerId || !mongoose.Types.ObjectId.isValid(user.customerId)) {
      return res.status(400).json({ message: "Invalid customerId" });
    }

    user.isLoggedIn = true;
    await user.save();

    res.json({
      message: "Login successful",
      customerId: user.customerId
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed" });
  }
};


// User - logout



// POST /cart

exports.addToCart = async (req, res) => {
  const { customerId, productId, quantity } = req.body;

  try {
    const user = await User.findOne({ customerId, isLoggedIn: true });
    if (!user) return res.status(401).json({ message: "Unauthorized" });
    const filePath = path.join(__dirname, "../sample.json");
    const products = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const product = products.find(p => p.id === productId);
    if (!product) return res.status(404).json({ message: "Product not found" });
    let cart = await Cart.findOne({ userId: user._id });

    if (cart) {
      const existingItem = cart.productItems.find(p => p.productId === productId);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
      
        cart.productItems.push({
          productId: product.id,
          title: product.title,
          description: product.description, // added description
          image: product.image,
          price: product.price,
          quantity,
          addedAt: new Date()
        });
      }

      await cart.save();
      return res.status(200).json({ message: "Cart updated successfully" });

    } else {
    
      const newCart = new Cart({
        userId: user._id,
        productItems: [
          {
            productId: product.id,
            title: product.title,
            description: product.description, 
            image: product.image,
            price: product.price,
            quantity,
            addedAt: new Date()
          }
        ]
      });

      await newCart.save();
      return res.status(201).json({ message: "New cart created" });
    }

  } catch (err) {
    console.error("Add to cart error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};


// remove item in the cart

exports.removeCartItem = async (req, res) => {
  const { productId } = req.params;

  try {
    const updatedCart = await Cart.findOneAndUpdate(
      { 'productItems.productId': parseInt(productId) },
      {
        $pull: {
          productItems: { productId: parseInt(productId) }
        }
      },
      { new: true }
    );

    if (!updatedCart) {
      return res.status(404).json({ message: "Cart with given product not found." });
    }

    res.status(200).json({
      message: "Item removed from cart.",
      cart: updatedCart
    });
  } catch (error) {
    console.error("Error removing cart item:", error);
    res.status(500).json({ message: "Server error." });
  }
};


// Google login

exports.googleLogin = async (req, res) => {
  const { email, name } = req.body;
  try {
    let user = await User.findOne({ email });

    if (!user) {
      // If new user, register automatically
      user = await User.create({ name, email, phone: 'N/A' });
    }

    res.json({ message: 'Login successful', customerId: user._id });
  } catch (error) {
    res.status(500).json({ message: 'Google login failed', error });
  }
};


// Shipping cart 
exports.getCartByCustomerId = async (req, res) => {
  const { customerId } = req.params;
  try {
    const user = await User.findOne({ customerId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const cart = await Cart.findOne({ userId: user._id });

    if (!cart || cart.productItems.length === 0) {
      return res.status(200).json({ message: "Cart is empty", productItems: [] });
    }
    return res.status(200).json({ productItems: cart.productItems });

  } catch (err) {
    console.error("Error fetching cart:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};




// Shipping Address


exports.saveShippingAddress = async (req, res) => {
  const { customerId, fullName, phone, address, state, pincode } = req.body;

  try {
    // Check if address exists for the customerId
    const existing = await Shipping.findOne({ customerId });
    if (existing) {
      await Shipping.updateOne(
        { customerId },
        { fullName, phone, address, state, pincode }
      );
      return res.status(200).json({ message: "Shipping address updated." });
    }

    // Create new shipping address
    const newAddress = new Shipping({
      customerId,
      fullName,
      phone,
      address,
      state,
      pincode
    });

    await newAddress.save();
    res.status(201).json({ message: "Shipping address saved successfully." });
  } catch (err) {
    res.status(500).json({ message: "Error saving shipping address", error: err.message });
  }
};


exports.getShippingAddress = async (req, res) => {
  const { customerId } = req.params;

  try {
    const shipping = await Shipping.findOne({ customerId });

    if (!shipping) {
      return res.status(404).json({ message: "Shipping address not found" });
    }

    res.status(200).json(shipping);
  } catch (error) {
    res.status(500).json({ message: "Error fetching shipping address", error });
  }
};


// SHipping address - update

exports.UpdateShippingAddress = async (req, res) => {
  const { id } = req.params;
  try {
    const updated = await Shipping.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ message: "Shipping address updated", updated });
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};


// Order 

exports.placeOrder = async (req, res) => {
  try {
    const {
      customerId,
      fullName,
      phone,
      address,
      state,
      pincode,
      items,
      subtotal,
      shipping,
      grandTotal
    } = req.body;

    
    const newOrder = new Order({
      orderId: customerId, 
      fullName,
      phone,
      address,
      state,
      pincode,
      items,
      subtotal,
      shipping,
      grandTotal
    });

    const savedOrder = await newOrder.save();

    // 2. Update stock and sold in sample.json
    const productFile = path.join(__dirname, '../sample.json');
    const products = JSON.parse(fs.readFileSync(productFile, 'utf-8'));

    for (const item of items) {
      const index = products.findIndex(p => p.id === item.productId);
      if (index !== -1) {
        // Reduce stock
        products[index].stock = Math.max(0, products[index].stock - item.quantity);

        // Increase sold
        products[index].sold = (products[index].sold || 0) + item.quantity;
      }
    }

    // Save updated products
    fs.writeFileSync(productFile, JSON.stringify(products, null, 2), 'utf-8');

    // 3. Clear user's cart
    await Cart.updateOne(
      { userId: customerId },
      { $set: { productItems: [] } }
    );

    res.status(201).json({
      message: 'Order placed successfully. Stock and sales updated.',
      order: savedOrder
    });
  } catch (error) {
    console.error("Order placement error:", error);
    res.status(500).json({
      message: 'Order placement failed',
      error: error.message
    });
  }
};



// Order placed - remove items

exports.clearCart = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const customerId = order.customerId;
    const objectId = new mongoose.Types.ObjectId(customerId);

    const cart = await Cart.findOne({ userId: objectId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found for this user' });
    }

    cart.productItems = [];
    await cart.save();

    res.status(200).json({ message: 'Cart cleared after order placed successfully.' });
  } catch (err) {
    console.error('Error clearing cart by orderId:', err);
    res.status(500).json({ message: 'Failed to clear cart.' });
  }
};

