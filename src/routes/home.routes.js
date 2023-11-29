/**
MODULE MANAGEMENT
 * 
 * 
 * 
 */
const express = require('express');
const homeRouters = express.Router();

/**
ROUTERS MANAGEMENT
 * 
 * 
 * 
 */

// Visit the page
homeRouters.get('/', (req, res) => {
  const ID = req.session.ID;
  // Pass the ID to EJS
  res.render('layouts/home', { ID: ID });
});

module.exports = homeRouters;
