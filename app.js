const express = require('express');

const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use('/admin', adminRoutes);
app.use('/shop', shopRoutes);

// Error 404
app.use('/', (req, res) => {
    res.status(404).send('Page not found')
})

app.listen(3000);