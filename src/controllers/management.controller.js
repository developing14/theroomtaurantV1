// The main management has 3 subsystems: product management, table management and request management
const productModel = require('../model/product.model');
const requestModel = require('../model/request.model');

exports.addProduct = (req, res) => {
  const name = req.body.pdName;
  const cost = req.body.pdCost;
  const intro = req.body.pdIntro;
  const staffID = req.session.ID;

  // Replace all backslash with the slash
  let rawPath = req.file.path;
  rawPath = rawPath.replace('src', '');
  const path = rawPath.replaceAll('\\', '/');

  productModel.addProduct(name, intro, path, cost, staffID);
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
