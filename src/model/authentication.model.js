/**
MODULE MANAGEMENT
 * 
 * 
 * 
 */
// const express = require('express');
const dataConnection = require('../connection/dataConnection');
const bcrypt = require('bcrypt');
const { emit } = require('process');
const { resolve } = require('path');
const { rejects } = require('assert');
const { brotliCompress } = require('zlib');
const { readSync } = require('fs');

/**
DEFINITION
 * 
 * 
 * 
 */
const saltRounds = 10;
const pswStaff = '01214308892@CAREER';

/*
CUSTOMER ACCOUNT MANAGEMENT
*
*
*
*/

// Check if there is an record in database that store the input email
// Return a boolean value.
//
exports.findCustomerEmail = async (email) => {
  return new Promise((resolve, rejects) => {
    dataConnection.query(
      `SELECT ctm_email FROM customer WHERE ctm_email = '${email}'`,
      (err, results, field) => {
        if (results.length > 0) resolve(true);
        else resolve(false);
      }
    );
  });
};

// Get ID of account by email, return the ID or null.
//
exports.getCustomerIDByEmail = (email) => {
  return new Promise((resolve, rejects) => {
    dataConnection.query(
      `SELECT account_ID FROM customer WHERE ctm_email = '${email}'`,
      (err, result, field) => {
        if (err) throw err;
        if (result.length > 0) resolve(result[0].account_ID);
        else resolve(null);
      }
    );
  });
};

// Get the hashed password by the email, return the hashed password or null.
//
// Due to the uniqueness of emails in database, use it to get the hashed-strings
//
exports.getCustomerHashedByEmail = async (email) => {
  return new Promise((resolve, rejects) => {
    dataConnection.query(
      `SELECT * FROM customer WHERE ctm_email = '${email}'`,
      async (err, result, fields) => {
        if (err) throw err;
        if (result.length > 0) resolve(result[0].account_pwd);
        else resolve(null);
      }
    );
  });
};

// Create a new user record in database, return an undefined value
//
exports.createCustomer = (name, email, psw, phone) => {
  // Hash the password into a hashed string ...
  bcrypt.hash(psw, saltRounds, (err, result) => {
    if (err) throw err;
    dataConnection.query(
      `INSERT INTO customer (ctm_name, ctm_email, account_pwd,ctm_phone) VALUES ('${name}', '${email}', '${result}', '${phone}')`
    );
  });
};

/**
 * STAFF ACCOUNT MANAGEMENT
 *
 *
 *
 */

// Check if there is an record in database that store the input email
// Return a boolean value.
//
exports.findStaffEmail = async (email) => {
  return new Promise((resolve, rejects) => {
    dataConnection.query(
      `SELECT staff_email FROM staff WHERE staff_email = '${email}'`,
      async (err, results, fields) => {
        if (err) rejects(err);
        if (results.length > 0) resolve(true);
        else resolve(false);
      }
    );
  });
};

// Get ID of account by email, return the ID or null.
//
exports.getStaffIDByEmail = (email) => {
  return new Promise((resolve, rejects) => {
    dataConnection.query(
      `SELECT account_ID FROM staff WHERE staff_email = '${email}'`,
      (err, result, field) => {
        if (err) throw err;
        if (result.length > 0) resolve(result[0].account_ID);
        else resolve(null);
      }
    );
  });
};

// Get the hashed password by the email, return the hashed password or null.
//
// Due to the uniqueness of emails in database, use it to get the hashed-strings
//
exports.getStaffHashedByEmail = async (email) => {
  return new Promise((resolve, rejects) => {
    dataConnection.query(
      `SELECT * FROM staff WHERE staff_email = '${email}'`,
      async (err, result, fields) => {
        if (err) throw err;
        if (result.length > 0) resolve(result[0].account_pwd);
        else resolve(null);
      }
    );
  });
};

// Create a new staff record in database
//
exports.createStaff = (name, email, psw, phone) => {
  // Hash the password into a hashed string ...
  bcrypt.hash(psw, saltRounds, (err, result) => {
    if (err) throw err;
    dataConnection.query(
      `INSERT INTO staff (staff_name, staff_email, account_pwd,staff_phone) VALUES ('${name}', '${email}', '${result}', '${phone}')`
    );
  });
};

/**
 * If the email is available in DB, there will be a hashed password, and we use it in compareSync(), then return the
 * result.
 * If the email is unavailable, return null instead.
 */
exports.authenticate = async (email, psw) => {
  const result = await this.getCustomerHashedByEmail(email);
  if (result) return bcrypt.compareSync(psw, result);
  else return null;
};

exports.authenticateStaff = async (email, psw) => {
  const result = await this.getStaffHashedByEmail(email);
  if (result) return bcrypt.compareSync(psw, result);
  else return null;
};
