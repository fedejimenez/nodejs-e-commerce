const express = require('express');

const router = express.Router();

// GET products -- /admin/products
router.get('/products', (req, res, next) => {
    res.send('List Products!');
});

// POST add products -- /admin/add-products
router.post('/add-product', (req, res, next) => {
    console.log(req.body);
    res.send('Add Product!');
});

module.exports = router;