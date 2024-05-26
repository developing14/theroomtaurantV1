const fs = require('fs');

const validEmailDomain = [
  '@gmail.com',
  '@yahoo.com',
  '@hotmail.com',
  '@aol.com',
  '@hotmail.co.uk',
  '@hotmail.fr',
  '@msn.com',
  '@yahoo.fr',
  '@wanadoo.fr',
  '@orange.fr',
  '@comcast.net',
  '@yahoo.co.uk',
  '@yahoo.com.br',
  '@yahoo.co.in',
  '@live.com',
  '@rediffmail.com',
  '@free.fr',
  '@gmx.de',
  '@web.de',
  '@yandex.ru',
  '@ymail.com',
  '@libero.it',
  '@outlook.com',
  '@uol.com.br',
  '@bol.com.br',
  '@mail.ru',
  '@cox.net',
  '@hotmail.it',
  '@sbcglobal.net',
  '@sfr.fr',
  '@live.fr',
  '@verizon.net',
  '@live.co.uk',
  '@googlemail.com',
  '@yahoo.es',
  '@ig.com.br',
  '@live.nl',
  '@bigpond.com',
  '@terra.com.br',
  '@yahoo.it',
  '@neuf.fr',
  '@yahoo.de',
  '@alice.it',
  '@rocketmail.com',
  '@att.net',
  '@laposte.net',
  '@facebook.com',
  '@bellsouth.net',
  '@yahoo.in',
  '@hotmail.es',
  '@charter.net',
  '@yahoo.ca',
  '@yahoo.com.au',
  '@rambler.ru',
  '@hotmail.de',
  '@tiscali.it',
  '@shaw.ca',
  '@yahoo.co.jp',
  '@sky.com',
  '@earthlink.net',
  '@optonline.net',
  '@freenet.de',
  '@t-online.de',
  '@aliceadsl.fr',
  '@virgilio.it',
  '@home.nl',
  '@qq.com',
  '@telenet.be',
  '@me.com',
  '@yahoo.com.ar',
  '@tiscali.co.uk',
  '@yahoo.com.mx',
  '@voila.fr',
  '@gmx.net',
  '@mail.com',
  '@planet.nl',
  '@tin.it',
  '@live.it',
  '@ntlworld.com',
  '@arcor.de',
  '@yahoo.co.id',
  '@frontiernet.net',
  '@hetnet.nl',
  '@live.com.au',
  '@yahoo.com.sg',
  '@zonnet.nl',
  '@club-internet.fr',
  '@juno.com',
  '@optusnet.com.au',
  '@blueyonder.co.uk',
  '@bluewin.ch',
  '@skynet.be',
  '@sympatico.ca',
  '@windstream.net',
  '@mac.com',
  '@centurytel.net',
  '@chello.nl',
  '@live.ca',
  '@aim.com',
  '@bigpond.net.au',
];

const validHeadNum = ['01', '02', '03', '07', '08', '09'];

// Ensure phone numbers have 10-11 chars and a valid head
exports.isValidPhoneNumber = (phone) => {
  if (phone.charAt(0) != 0) return false;
  if (phone.length < 10 || phone.length > 11) return false;

  const compare = phone.slice(0, 2);

  return validHeadNum.includes(compare) ? true : false;
};

// Ensure emails have a valid domain
exports.isValidEmail = (email) => {
  const compare = email.slice(email.indexOf('@'), email.length);

  return validEmailDomain.includes(compare) ? true : false;
};

// Ensure password have 6-20 chars that contain lowercase, uppercase and number characters.
exports.isValidPassword = (psw) => {
  const lowCase = /[a - z]/g;
  const upCase = /[A - Z]/g;
  const num = /[0-9]/g;

  if (psw.length < 6 || psw.length > 20) return false;

  return psw.match(lowCase) && psw.match(upCase) && psw.match(num)
    ? true
    : false;
};

// Ensure the names only have alphabet characters and space
exports.isValidName = (name) => {
  const validChar = /^[a-zA-Z ]+$/;
  const compare = name.replaceAll(' ', '');

  return !validChar.test(name) ? false : true;
};

// Validate information from customer register form
exports.isValidRegisterInfo = (req, res, next) => {
  // Capture input fields
  const name = req.body.username;
  const email = req.body.email;
  const phone = req.body.phone;
  const psw = req.body.psw;
  if (
    !this.isValidName(name) ||
    !this.isValidEmail(email) ||
    !this.isValidPassword(psw) ||
    !this.isValidPhoneNumber(phone)
  ) {
    req.session.invalid = true;
    return res.redirect('/auth');
  }

  next();
};

// Return true if the cost is a number, or false otherwise
exports.isValidCost = (cost) => {
  return typeof cost !== 'number' ? false : true;
};

// Return true if the path is exist, or false otherwise
exports.isValidPath = (req, res, next) => {
  let path = req.file.path;
  path = path.replaceAll(`\\\\`, '\\');
  if (fs.existsSync(path)) next();
  else res.send('ERROR WITH IMAGE');
};
