const fs = require('fs');
const path = require('path');
const { User, Order } = require('../models/Schema.js');

const samplePath = path.join(__dirname, '../sample.json');

const readSampleData = () => JSON.parse(fs.readFileSync(samplePath, 'utf-8'));
const writeSampleData = (data) =>
  fs.writeFileSync(samplePath, JSON.stringify(data, null, 2));

/** ---------------- PRODUCT HANDLERS ---------------- **/

// GET all products
exports.getAllProducts = (req, res) => {
  try {
    const products = readSampleData();
    res.json(products);
  } catch {
    res.status(500).json({ error: 'Failed to read products' });
  }
};

// GET single product by ID
exports.getProductById = (req, res) => {
  try {
    const products = readSampleData();
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch {
    res.status(500).json({ error: 'Error reading product file' });
  }
};

// POST create new product
exports.createProduct = (req, res) => {
  try {
    const products = readSampleData();
    const newProduct = {
      ...req.body,
      id: products.length > 0 ? products[products.length - 1].id + 1 : 1,
      sold: 0,
    };
    products.push(newProduct);
    writeSampleData(products);
    res.status(201).json({ message: 'Product created', product: newProduct });
  } catch {
    res.status(500).json({ error: 'Failed to create product' });
  }
};

// PATCH update product
exports.updateProduct = (req, res) => {
  try {
    const products = readSampleData();
    const index = products.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ error: 'Product not found' });

    products[index] = { ...products[index], ...req.body };
    writeSampleData(products);
    res.json({ message: 'Product updated', product: products[index] });
  } catch {
    res.status(500).json({ error: 'Failed to update product' });
  }
};

// DELETE product
exports.deleteProduct = (req, res) => {
  try {
    let products = readSampleData();
    const index = products.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ error: 'Product not found' });

    const deleted = products.splice(index, 1);
    writeSampleData(products);
    res.json({ message: 'Product deleted', product: deleted[0] });
  } catch {
    res.status(500).json({ error: 'Failed to delete product' });
  }
};


// GET all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 }); // Latest first
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};


exports.getAllOrders = async (req, res) => {
  try {
    const users = await Order.find().sort({ createdAt: -1 }); // Latest first
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};
