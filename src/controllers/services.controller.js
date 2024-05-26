const reqModel = require('../model/request.model');
const tableModel = require('../model/table.model');

exports.order = async (req, res) => {
  const orderDate = req.body.date;
  const orderTime = req.body.time;
  const product = req.body.product;
  const msg = req.body.msg;
  const ctm_ID = req.session.ID;

  const emptyTable = await tableModel.getEmptyTable(orderDate, orderTime);

  // If there is no empty table, send user message
  if (!emptyTable)
    return res.send('There is no ready table with the time you set!');

  reqModel.createRequest(
    emptyTable,
    orderDate,
    orderTime,
    product,
    msg,
    ctm_ID
  );

  res.redirect('/order');
};
