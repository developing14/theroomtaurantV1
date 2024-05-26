/**
MODULE MANAGEMENT
 * 
 * 
 * 
 */
const express = require('express');
const managementRouters = express.Router();
const dataConnection = require('../connection/dataConnection');
const autho = require('../util/Authorizers.util');
const authen = require('../controllers/authentication.controller');
const validator = require('../util/Validators.util');
const path = require('path');
const managementController = require('../controllers/management.controller');

// Configuration for Multer to control file
const multer = require('multer');
const { log } = require('console');
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    // First argument to handle error, second argument is the destinating path
    callback(null, 'src/public/img/images/menu');
  },
  filename: (req, file, callback) => {
    // First argument to handle error, second argument is the file name
    callback(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

/**
ROUTERS MANAGEMENT
 * 
 * 
 * 
 */

// Take staffs to productBoard by default
managementRouters.get('/management', autho.authStaff, (req, res) => {
  res.redirect('/productBoard');
});

// Visit the login page
managementRouters.get('/management-login', (req, res) => {
  res.render('layouts/staff-login');
});

// Login
managementRouters.post('/management-login', authen.staffLogin);

/**
PRODUCT ROUTERS MANAGEMENT
 *
 */

// Visit the product board, query all products from database
managementRouters.get('/productBoard', (req, res) => {
  dataConnection.query(`SELECT * FROM product`, (err, result, field) => {
    if (err) throw err;
    res.render('layouts/management', { page: 'productBoard', prods: result });
  });
});

// POST method from add product form
managementRouters.post(
  '/product-add',
  upload.single('pdImg'),
  managementController.addProduct
);

// POST method from edit product form
managementRouters.post(
  '/product-edit',
  upload.single('pdImg'),
  managementController.editProduct
);

managementRouters.post('/product-delete', managementController.deleteProduct);

managementRouters.post('/product-restore', managementController.restoreProduct);

/**
REQUEST ROUTERS MANAGEMENT
 *
 */

managementRouters.get('/requestList', autho.authStaff, (req, res) => {
  dataConnection.query(
    `SELECT request.*, thr.orderDay, thr.orderTime, customer.ctm_name, customer.ctm_phone FROM request 
JOIN table_has_request thr ON request.rq_ID = thr.request_rq_ID
JOIN customer ON customer.account_ID = request.customer_account_ID`,
    (err, result, field) => {
      if (err) throw err;
      res.render('layouts/management', { page: 'requestList', reqs: result });
    }
  );
});

managementRouters.get('/confirm/:id', managementController.confirmRequest);

managementRouters.get('/deny/:id', managementController.denyRequest);

module.exports = managementRouters;
