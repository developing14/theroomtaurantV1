const dataConnection = require('../connection/dataConnection');

// Add new record into product table in database
exports.addProduct = (name, intro, imgPath, cost, staffID) => {
  dataConnection.query(
    `INSERT INTO product (pd_name, pd_intro, pd_img, pd_cost,staff_accountID) VALUES ('${name}', '${intro}', '${imgPath}','${cost}', '${staffID}')`
  );
};

// Retrieve data of product from database with the ID product
exports.getProductByID = (ID) => {
  return new Promise((resolve) => {
    dataConnection.query(
      `SELECT * FROM product WHERE pd_ID='${ID}'`,
      (err, result) => {
        resolve(result);
      }
    );
  });
};

// Update data of products in database, using ID to target
exports.editProduct = (ID, newName, newIntro, newImgPath, newCost, staffID) => {
  dataConnection.query(
    `UPDATE product SET pd_name = '${newName}', pd_intro = '${newIntro}', pd_img='${newImgPath}', pd_cost='${newCost}',staff_accountID='${staffID}' WHERE pd_ID ='${ID}'`,
    (err) => {
      if (err) throw err;
    }
  );
};

// Update "isDeleted" column of product in databse into 1
exports.deleteProduct = (ID) => {
  dataConnection.query(`UPDATE product SET isDeleted= 1 WHERE pd_ID ='${ID}'`);
};

// Update "isDeleted" column of product in databse into 0
exports.restoreProduct = (ID) => {
  dataConnection.query(`UPDATE product SET isDeleted=0 WHERE pd_ID ='${ID}'`);
};
