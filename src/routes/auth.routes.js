/**
MODULE MANAGEMENT
 * 
 * 
 * 
 */
const express = require('express');
const authenRouters = express.Router();
const validator = require('../util/Validators.util');
const authControllers = require('../controllers/authentication.controller');

/**
ROUTERS MANAGEMENT
 * 
 * 
 * 
 */

// Visit the page
authenRouters.get('/auth', (req, res) => {
  res.render('layouts/authentication', {
    invalid: req.session.invalid,
    incorrect: req.session.incorrect,
  });
});

//
authenRouters.post(
  '/register',
  validator.isValidRegisterInfo,
  authControllers.register
);

// POST method from customer login form
authenRouters.post('/login', authControllers.login);

// Logout
authenRouters.get('/logout', authControllers.logout);

module.exports = authenRouters;
