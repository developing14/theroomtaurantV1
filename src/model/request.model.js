const dataConnection = require('../connection/dataConnection');

exports.createRequest = async (
  emptyTable,
  date,
  time,
  product,
  msg,
  ctm_ID
) => {
  return new Promise((resolve, rejects) => {
    dataConnection.query(
      `INSERT INTO request (rq_Message, product_pd_ID, staff_account_ID, customer_account_ID) VALUES ('${msg}', ${product}, 0, ${ctm_ID});`,
      (err, result) => {
        const rqID = result.insertId;
        dataConnection.query(
          `INSERT INTO table_has_request (table_tb_ID, request_rq_ID, orderTime, orderDay) VALUES (${emptyTable}, ${rqID}, '${time}', '${date}')`
        );
      }
    );
  });
};

exports.confirmRequest = (rqID, sfID) => {
  dataConnection.query(
    `UPDATE request SET rq_Status ='confirmed', staff_account_ID= ${sfID} WHERE rq_ID = ${rqID}`
  );
};

exports.denyRequest = (rqID, sfID) => {
  dataConnection.query(
    `UPDATE request SET rq_Status ='denied', staff_account_ID= ${sfID} WHERE rq_ID = ${rqID}`
  );
};
