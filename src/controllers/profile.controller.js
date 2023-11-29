const express = require('express');
const app = express();
const val = require('../util/Validators.util');

const profileModel = require('../model/profile.model');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

exports.editProfile = (req, res) => {
  const newName = req.body.infoName;
  const newPhone = req.body.infoPhone;
  const ROLE = req.session.ROLE;
  const ID = req.session.ID;

  if (!val.isValidName(newName) || !val.isValidPhoneNumber(newPhone))
    return res.send('Invalid information. Please try again.');

  if (ID)
    switch (ROLE) {
      case 'customer': {
        profileModel.editProfileCustomer(ID, newName, newPhone);
        console.log('Changed customer');
        break;
      }
      case 'staff': {
        profileModel.editProfileStaff(ID, newName, newPhone);
        console.log('Changed staff');
        break;
      }
      default:
        return res.send(
          'You cannot changed your profile now. Please try again'
        );
    }
  return res.redirect('/profile');
};
