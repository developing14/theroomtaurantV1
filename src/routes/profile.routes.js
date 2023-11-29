/**
MODULE MANAGEMENT
 * 
 * 
 * 
 */
const express = require('express');
const profileRoutes = express.Router();
const profileController = require('../controllers/profile.controller');
const autho = require('../util/Authorizers.util');
const dataConnection = require('../connection/dataConnection');

/**
ROUTERS MANAGEMENT
 * 
 * 
 * 
 */

// Visit the page. Query the information based on the ID in session
profileRoutes.get('/profile', autho.authUser, (req, res) => {
  const ID = req.session.ID;
  dataConnection.query(
    `SELECT * FROM customer WHERE account_ID='${ID}'`,
    (err, result, field) => {
      if (err) throw err;
      res.render('layouts/profile', { customer: result });
    }
  );
});

// Edit profile
profileRoutes.post('/profile', autho.authUser, profileController.editProfile);

module.exports = profileRoutes;
