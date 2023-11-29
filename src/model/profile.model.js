const { rejects } = require('assert');
const express = require('express');
const { resolve } = require('path');
const app = express();
const dataConnection = require('../connection/dataConnection');

exports.editProfileCustomer = (ID, newName, newPhone) => {
  return new Promise((resolve, rejects) => {
    dataConnection.query(
      `UPDATE customer SET ctm_name ='${newName}', ctm_phone='${newPhone}' WHERE account_ID = '${ID}'`,
      (err, result, field) => {
        if (err) throw err;
      }
    );
  });
};

exports.editProfileStaff = (ID, newName, newPhone) => {
  return new Promise((resolve, rejects) => {
    dataConnection.query(
      `UPDATE staff SET staff_name ='${newName}', staff_phone='${newPhone}' WHERE account_ID = '${ID}'`,
      (err, result, field) => {
        if (err) throw err;
      }
    );
  });
};

exports.getCustomereByID = (ID) => {
  return new Promise((resolve, rejects) => {
    dataConnection.query(
      `SELECT * FROM customer WHERE account_ID ='${ID}'`,
      (err, result, field) => {
        if (err) throw err;
        resolve(result);
      }
    );
  });
};

exports.getStaffByID = (ID) => {
  return new Promise((resolve, rejects) => {
    dataConnection.query(
      `SELECT * FROM staff WHERE account_ID ='${ID}'`,
      (err, result, field) => {
        if (err) throw err;
        resolve(result);
      }
    );
  });
};

// Get the username by ID, return the name or null.
//
exports.getCustomerNameByID = async (ID) => {
  return new Promise((resolve, rejects) => {
    dataConnection.query(
      `SELECT ctm_name FROM customer WHERE account_ID = '${ID}'`,
      (err, result, fields) => {
        if (err) throw err;
        if (result.length > 0) resolve(result[0].ctm_name);
        else resolve(null);
      }
    );
  });
};

// Get email by ID, return the email or null.
//
exports.getCustomerEmailByID = async (ID) => {
  return new Promise((resolve, rejects) => {
    dataConnection.query(
      `SELECT ctm_email FROM customer WHERE account_ID = '${ID}'`,
      (err, result, field) => {
        if (err) throw err;
        if (result.length > 0) resolve(result[0].ctm_email);
        else resolve(null);
      }
    );
  });
};

// Get phone number by ID, return the result or null.
//
exports.getCustomerPhoneByID = async (ID) => {
  return new Promise((resolve, rejects) => {
    dataConnection.query(
      `SELECT ctm_phone FROM customer WHERE account_ID = '${ID}'`,
      (err, result, field) => {
        if (err) throw err;
        if (result.length > 0) resolve(result[0].ctm_phone);
        else resolve(null);
      }
    );
  });
};

// Edit the existing user record with the inputs, return the ID
//
exports.editCustomer = async (ID, name, email, psw, phone) => {
  // Hash the password into hashed string...
  bcrypt.hashSync(psw, saltRounds, (err, hash) => {
    if (err) throw err;
    // ... then alternate data in database
    dataConnection.query(
      `UPDATE customer SET ctm_name = ${name},ctm_email = ${email},account_pwd = ${hash},ctm_phone = ${phone} WHERE ID = ${ID}`,
      (err, result, fields) => {
        if (err) throw err;
        console.log(result);
      }
    );
  });
  return ID;
};

// Edit the existing staff record with the inputs, return the ID
//
exports.editStaff = async (ID, name, email, psw, phone) => {
  // Hash the password into hashed string...
  bcrypt.hash(psw, saltRounds, (err, hash) => {
    if (err) throw err;
    // ... then alternate data in database
    dataConnection.query(
      `UPDATE staff SET staff_name = '${name}',staff_email = '${email}',account_pwd = '${hash}',staff_phone = '${phone}' WHERE account_ID = '${ID}'`,
      (err, result, fields) => {
        if (err) throw err;
        console.log('result: ', result);
      }
    );
  });
  return ID;
};

// Get the username by ID, return the name or null.
//
exports.getStaffNameByID = async (ID) => {
  return new Promise((resolve, rejects) => {
    dataConnection.query(
      `SELECT staff_name FROM staff WHERE account_ID = '${ID}'`,
      (err, result, fields) => {
        if (err) throw err;
        if (result.length > 0) resolve(result[0].staff_name);
        else resolve(null);
      }
    );
  });
};

// Get email by ID, return the email or null.
//
exports.getStaffEmailByID = async (ID) => {
  return new Promise((resolve, rejects) => {
    dataConnection.query(
      `SELECT staff_email FROM staff WHERE account_ID = '${ID}'`,
      (err, result, field) => {
        if (err) throw err;
        if (result.length > 0) resolve(result[0].staff_email);
        else resolve(null);
      }
    );
  });
};

// Get phone number by ID, return the result or null.
//
exports.getStaffPhoneByID = async (ID) => {
  return new Promise((resolve, rejects) => {
    dataConnection.query(
      `SELECT staff_phone FROM staff WHERE account_ID = '${ID}'`,
      (err, result, field) => {
        if (err) throw err;
        if (result.length > 0) resolve(result[0].staff_phone);
        else resolve(null);
      }
    );
  });
};
