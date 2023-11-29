/**
MODULE MANAGEMENT
 * 
 * 
 * 
 */
const express = require('express');
const mysql = require('mysql');

// Set up configuration to connect with DBMS
//
const dataConfiguration = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456@MySQL',
  database: 'theroomtaurant',
  connectionLimit: 100,
});

module.exports = dataConfiguration;
