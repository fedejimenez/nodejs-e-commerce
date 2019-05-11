const express = require('express');

// import functions --> deconstruction
const { check, body } = require('express-validator/check');

const authController = require('../controllers/auth');

const User = require('../models/user');

const router = express.Router();

const listEndpoints = require('express-list-endpoints');

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post('/login', authController.postLogin);

router.post('/signup', [
        check('email')
        .isEmail()
        .withMessage('Please enter a valid Email')
        .custom((value, { req }) => {
            //     if (value === 'test@test.com') {
            //         throw new Error('This email address is forbidden');
            //     }
            //     return true;
            return User.findOne({ email: value })
                .then(userDoc => {
                    // check if email already exists (Async validation)
                    if (userDoc) {
                        return Promise.reject('Email exists already, please choose a different one.');
                    }
                });
        }),
        body(
            'password',
            'Please enter a password with only numbers and text and between 5 and 15 characters long.'
        )
        .isLength({ min: 5, max: 15 })
        .isAlphanumeric(),
        body('confirmPassword')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Passwords doesn\'t match!')
            }
            return true;
        })
    ],
    authController.postSignup);

router.post('/logout', authController.postLogout);

router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);

router.get('/reset/:token', authController.getNewPassword);

router.post('/new-password', authController.postNewPassword);

// console.log(listEndpoints(router));

module.exports = router;