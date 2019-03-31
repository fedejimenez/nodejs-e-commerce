const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    // console.log('In the middleware');
    res.send('Hello World!');
});

module.exports = router;