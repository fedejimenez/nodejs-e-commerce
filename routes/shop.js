const path = require('path');

const express = require('express');

// get root directory
const rootDir = require('../helpers/path');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'shop.html'));
});

module.exports = router;