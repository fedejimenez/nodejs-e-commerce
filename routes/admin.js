const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

// GET -- /admin/add-product
router.get('/add-product', adminController.getAddProduct);

router.get('/products', adminController.getProducts);

// POST add products -- /admin/add-products
router.post('/add-product', adminController.postAddProduct);

exports.routes = router;