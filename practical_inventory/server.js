const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/Product');

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/inventory')
    .then(() => console.log('Connected to MongoDB (inventory)'))
    .catch(err => console.error('MongoDB connection error:', err));

// Add product (POST)
app.post('/products', async (req, res) => {
    try {
        const product = new Product(req.body);
        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Filter products with low stock OR Search by name OR View all products (GET)
app.get('/products', async (req, res) => {
    try {
        let query = {};
        
        // Search product by name
        if (req.query.name) {
            query.productName = { $regex: req.query.name, $options: 'i' };
        }
        
        // Filter products with low stock (e.g., quantity < 10)
        if (req.query.lowStock === 'true') {
            query.quantity = { $lt: 10 }; // Defined 'low stock' as less than 10
        }

        const products = await Product.find(query);
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// View product by ID (GET)
app.get('/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update product quantity and price (PUT)
app.put('/products/:id', async (req, res) => {
    try {
        // Extracting only quantity and price for update as per requirements
        const updateData = {};
        if (req.body.quantity !== undefined) updateData.quantity = req.body.quantity;
        if (req.body.price !== undefined) updateData.price = req.body.price;

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );
        if (!updatedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete product (DELETE)
app.delete('/products/:id', async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Inventory API running on http://localhost:${PORT}`);
});
