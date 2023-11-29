/**
MODULE MANAGEMENT
 * 
 * 
 * 
 */
const express = require('express');
const path = require('path');
const dataConnection = require('./connection/dataConnection');
const session = require('express-session');

/**
DEFINITION
 * 
 * 
 * 
 */
const app = express();

/**
STATIC FILES
 * 
 *  
 * 
 */
app.use('/public', express.static(__dirname + '/public'));

/**
MIDDLEWARES
 * 
 * 
 * 
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'my-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 1800000 },
  })
);

/**
TEMPLATE ENGINE
 * 
 * 
 * 
 */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

/**
ROUTERS MANAGEMENT
 * 
 * 
 * 
 */

const authenRouter = require('./routes/auth.routes');
const auth = app.use('/', authenRouter);

const homeRouters = require('./routes/home.routes');
const home = app.use('/', homeRouters);

const servicesRouters = require('./routes/services.routes');
const service = app.use('/', servicesRouters);

const profileRoutes = require('./routes/profile.routes');
const profile = app.use('/', profileRoutes);

const managementRoutes = require('./routes/management.routes');
const management = app.use('/', managementRoutes);

// Log a time whenever next() function is triggered
app.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});

/**
SERVER
 * 
 * 
 * 
 */

// Get connection to the DBMS first,
//  if success, go listening to port 3000

const port = 3000;
dataConnection.getConnection((err) => {
  if (err) throw err;
  console.info('Connected to MySQL');
  app.listen(port, () => {
    console.info(`App is listening at http://localhost:${port}`);
  });
});
