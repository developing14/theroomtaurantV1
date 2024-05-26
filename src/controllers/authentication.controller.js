const authen = require('../model/authentication.model');

// Signup for customers
exports.register = async (req, res) => {
  // Reset status stored in session
  req.session.invalid = false;
  req.session.incorrect = false;

  // Capture input fields
  const username = req.body.username;
  const email = req.body.email.toLowerCase();
  const psw = req.body.psw;
  const phone = req.body.phone;

  // If email has already been used, information is invalid
  await authen.findCustomerEmail(email).then((result) => {
    if (result) {
      req.session.invalid = true;
      return res.redirect('/auth');
    }
  });

  // If req pass the validation, create a record in customer table
  authen.createCustomer(username, email, psw, phone);
  res.redirect('/auth');
};

// Login for customers
exports.login = async (req, res) => {
  // Reset status stored in session
  req.session.invalid = false;
  req.session.incorrect = false;

  // Capture input fields
  const email = req.body.email;
  const psw = req.body.psw;

  // If the email has not been signed up yet, redirect
  //
  const isExistedEmail = await authen.findCustomerEmail(email);
  if (!isExistedEmail) {
    req.session.incorrect = true;
    return res.redirect('/auth');
  }

  // If email and password are both correct, log user in and take them to homepage. Otherwise, take them back to login page.
  //
  const isAuthenticated = await authen.authenticate(email, psw);

  if (!isAuthenticated) {
    req.session.incorrect = true;
    return res.redirect('/auth');
  } else {
    req.session.ID = await authen.getCustomerIDByEmail(email);
    req.session.ROLE = 'customer';
    res.redirect('/');
  }
};

// Login for staffs
exports.staffLogin = async (req, res) => {
  const email = req.body.email;
  const psw = req.body.psw;

  // If the email has not been signup yet, take them back to login page.
  const isExistedEmail = authen.findStaffEmail(email);
  if (!isExistedEmail) return res.redirect('/management-login');

  // If email and password are both correct, log user in and take them to homepage. Otherwise, take them back to login page.
  const isAuthenticated = await authen.authenticateStaff(email, psw);
  if (!isAuthenticated) res.redirect('/management-login');
  else {
    req.session.ID = await authen.getStaffIDByEmail(email);
    req.session.ROLE = 'staff';
    res.redirect('/management');
  }
};

// Logout
exports.logout = (req, res) => {
  req.session.ID = null;
  req.session.ROLE = null;
  res.redirect('/');
};
