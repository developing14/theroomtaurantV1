/**
MODULE MANAGEMENT
 * 
 * 
 * 
 */
const express = require('express');
const app = express();

// The main management has 3 subsystems: product management, table management and request management
// To be clear, these 3 subsystems will be separated into 3 different models, respectively.
const productModel = require('../model/product.model');
const tableModel = require('../model/table.model');
const requestModel = require('../model/request.model');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
PRODUCT MANAGEMENT
 * 
 * 
 * 
 */

exports.addProduct = (req, res) => {
  const name = req.body.pdName;
  const cost = req.body.pdCost;
  const intro = req.body.pdIntro;
  let rawPath = req.file.path;

  // Format the path before add it to database, replace all backslash with the slash
  rawPath = rawPath.replace('src', '');
  const path = rawPath.replaceAll('\\', '/');

  productModel.addProduct(name, intro, path, cost, 1);
};

exports.editProduct = (req, res) => {
  const newName = req.body.pdName;
  const newCost = req.body.pdCost;
  const newIntro = req.body.pdIntro;
  const pdID = req.body.itemID;
  const staffID = req.session.ID;

  let rawPath = req.file.path.replace('src', '');
  const path = rawPath.replaceAll('\\', '/');

  productModel.editProduct(pdID, newName, newIntro, path, newCost, staffID);
};

exports.deleteProduct = (req, res) => {
  const ID = req.body.itemID;

  productModel.deleteProduct(ID);
};

exports.restoreProduct = (req, res) => {
  const ID = req.body.itemID;

  productModel.restoreProduct(ID);
};

exports.confirmRequest = (req, res) => {
  const sfID = req.session.ID;
  const rqID = req.params.id;

  requestModel.confirmRequest(rqID, sfID);
  return res.redirect('/requestList');
};

exports.denyRequest = (req, res) => {
  const sfID = req.session.ID;
  const rqID = req.params.id;

  requestModel.denyRequest(rqID, sfID);
  return res.redirect('/requestList');
};
