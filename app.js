const path = require('path');

const express = require('express');

const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use('/admin', adminRoutes);
app.use('/shop', shopRoutes);

// Error 404
app.use('/', (req, res) => {
    // path allows me to work with different SOs for absolute routes
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
})

app.listen(3000);