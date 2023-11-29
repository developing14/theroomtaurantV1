const express = require('express');

exports.authUser = (req, res, next) => {
  if (!req.session.ID) res.redirect('/auth');
  else next();
};

exports.authCustomer = (req, res, next) => {
  if (req.session.ROLE !== 'customer') res.redirect('/auth');
  else next();
};

exports.authStaff = (req, res, next) => {
  if (req.session.ROLE !== 'staff') res.redirect('/management-login');
  else next();
};
