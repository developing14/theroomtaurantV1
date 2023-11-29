/**
MODULE MANAGEMENT
 * 
 * 
 * 
 */
const { compareSync } = require('bcrypt');
const express = require('express');
const reqModel = require('../model/request.model');
const tableModel = require('../model/table.model');

exports.order = async (req, res) => {
  const oDate = req.body.date;
  const oTime = req.body.time;
  const product = req.body.product;
  const msg = req.body.msg;
  const ctm_ID = req.session.ID;

  const emptyTable = await tableModel.getEmptyTable(oDate, oTime);

  // If there is no empty table, send user message
  if (!emptyTable)
    return res.send('There is no ready table with the time you set!');

  reqModel.createRequest(emptyTable, oDate, oTime, product, msg, ctm_ID);

  res.redirect('/order');
};
