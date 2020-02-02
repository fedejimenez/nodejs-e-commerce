require('dotenv').config(); // To access env variables
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDbStore = require('connect-mongodb-session')(session);
const csrf = require('csurf'); // csrf protection
const flash = require('connect-flash'); // flash messages
const multer = require('multer');
const compression = require('compression');

const errorController = require('./controllers/error');
const User = require('./models/user');
const shopController = require('./controllers/shop');
const isAuth = require('./middleware/is-auth');


const app = express();
const store = new MongoDbStore({
    uri: process.env.PROD_MONGODB_URI,
    collection: 'sessions'
});

const csrfProtection = csrf();

// multer for dealing with file in request
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mymetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true);
    }
    cb(null, false);
};

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

// assets compression middleware for deployment
app.use(compression());

// Midlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(session({
    secret: 'my secret',
    resave: false, // save only if changes
    saveUninitialized: false,
    store: store
        // cookie: {
        // expires: ,
        // maxAge:
        // }
}));

// midleware for flash messages
app.use(flash());

// check authentication into all pages
app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    next();
});

app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    User.findById(req.session.user._id)
        .then(user => {
            if (!user) {
                return next();
            }
            req.user = user;
            next();
        })
        .catch(err => {
            //throw new Error(err); // doesn't call the error middleware from async 
            next(new Error(err)); // proper way when inside async code!
        });
});

// Dont need csrf protection for payment - Stripes takes care
app.post('/create-order', isAuth, shopController.postOrder);

// check for csrf token in any post request 
app.use(csrfProtection);
app.use((req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.get('/500', errorController.get500);

app.use(errorController.get404);

app.use((err, req, res, next) => {
    // res.status(error.httpStatusCode).render(...);
    // res.redirect('/500');
    // console.log(err);
    res.status(500).render('500', {
        pageTitle: 'Error',
        path: '/500',
        isAuthenticated: req.session.isLoggedIn
    });
});

mongoose
    .connect(process.env.PROD_MONGODB_URI)
    .then(result => {
        app.listen(process.env.PORT || 3000);
    }).catch(err => {
        console.log(err);;
    })