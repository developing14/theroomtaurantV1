/**
MODULE MANAGEMENT
 * 
 * 
 * 
 */
const express = require('express');
const serviceRouters = express.Router();
const autho = require('../util/Authorizers.util');
const orderController = require('../controllers/services.controller');
const dataConnection = require('../connection/dataConnection');

/**
ROUTERS MANAGEMENT
 * 
 * 
 * 
 */
// Render order layout, query all products that are not deleted and show them on menu
serviceRouters.get('/order', (req, res) => {
  const ctm_ID = req.session.ID;
  dataConnection.query(
    `SELECT * FROM product WHERE isDeleted=0`,
    (err, result, field) => {
      if (err) throw err;
      res.render('layouts/service', {
        page: 'order',
        items: result,
        user: ctm_ID,
      });
    }
  );
});

// Send order request
serviceRouters.post('/order', autho.authCustomer, orderController.order);

// Render order layout, query all requests of users and show them on board
serviceRouters.get('/request', autho.authCustomer, (req, res) => {
  const ctm_ID = req.session.ID;
  dataConnection.query(
    `SELECT request.*, table_has_request.orderTime, table_has_request.orderDay, tables.tb_name, product.pd_Name
FROM request
JOIN table_has_request ON request.rq_ID = table_has_request.request_rq_ID
JOIN product ON product.pd_ID = request.product_pd_ID 
JOIN tables ON tables.tb_ID = table_has_request.table_tb_ID WHERE customer_account_ID=${ctm_ID}`,
    (err, result, field) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Server Error');
      }
      res.render('layouts/service', {
        page: 'request',
        reqs: result,
        user: ctm_ID,
      });
    }
  );
});

module.exports = serviceRouters;
