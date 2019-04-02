const path = require('path');

const express = require('express');

// get root directory
const rootDir = require('../helpers/path');

const router = express.Router();

const products = [];

// GET -- /admin/add-product
router.get('/add-product', (req, res, next) => {
    res.render('add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
    });
});

// POST add products -- /admin/add-products
router.post('/add-product', (req, res, next) => {
    products.push({ title: req.body.title });
    res.redirect('/');
});

exports.routes = router;
exports.products = products;