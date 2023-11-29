/**
MODULE MANAGEMENT
 * 
 * 
 * 
 */
const express = require('express');
const dataConnection = require('../connection/dataConnection');
const { resolve } = require('path');
const { rejects } = require('assert');
const { compareSync } = require('bcrypt');

// Add new table into database
exports.addTable = (name) => {
  dataConnection.query(`INSERT INTO tables (tb_name) VALUES ('${name}')`);
};

// Find table by its name in database, return a boolean value respectively
exports.findTable = (name) => {
  return new Promise((resolve, rejects) => {
    dataConnection.query(
      `SELECT * FROM tables WHERE tb_name='${name}'`,
      (err, result, field) => {
        if (err) throw err;
        if (result.length > 0) resolve(true);
        else resolve(false);
      }
    );
  });
};

// Change table's name by the new name, target by its ID
exports.renameTable = (ID, newName) => {
  dataConnection.query(
    `UPDATE tables SET tb_name='${newName}' WHERE tb_ID = '${ID}'`
  );
};

// Change isDeleted column in database into 1;
exports.deleteTable = (ID) => {
  dataConnection.query(`UPDATE tables SET isDeleted=1 WHERE tb_ID = '${ID}'`);
};

// Change isDeleted column in database into 0;
exports.restoreTable = (ID) => {
  dataConnection.query(`UPDATE tables SET isDeleted=0 WHERE tb_ID = '${ID}'`);
};

// Get the ID of an empty table at the specific date and time
exports.getEmptyTable = (oDate, oTime) => {
  return new Promise((resolve, rejects) => {
    dataConnection.query(
      `SELECT tb_ID FROM tables
WHERE tb_ID NOT IN (
    SELECT table_tb_ID FROM table_has_request
    JOIN request ON table_has_request.request_rq_ID = request.rq_ID
    WHERE orderDay = '${oDate}' AND orderTime = '${oTime}' AND rq_Status != 'denied'
)
`,
      (err, results, field) => {
        if (results.length > 0) resolve(results[0].tb_ID);
        else resolve(0);
      }
    );
  });
};
