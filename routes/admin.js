const path = require('path');

const express = require('express');

// get root directory
const rootDir = require('../helpers/path');

const router = express.Router();

// GET -- /admin/add-product
router.get('/add-product', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
});

// POST add products -- /admin/add-products
router.post('/add-product', (req, res, next) => {
    console.log(req.body);
    // res.send('Add Product!');
    res.sendFile(path.join(rootDir, 'views', 'shop.html'));
});

module.exports = router;