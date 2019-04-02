const path = require('path');

const express = require('express');

const productsController = require('../controllers/products');

const router = express.Router();

// GET -- /admin/add-product
router.get('/add-product', productsController.getAddProduct);

// POST add products -- /admin/add-products
router.post('/add-product', productsController.postAddProduct);

exports.routes = router;