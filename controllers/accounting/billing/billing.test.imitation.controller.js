const db = require('../../../models');

const BalanceTest = db.balanceTest;

exports.testPaymentForService = async (req, res, next) => {
  try {
    const terminal_id = req.query.id;
    const {payment, dateOfPayment} = req.body;
    console.log(payment, dateOfPayment, terminal_id);

    res.status(200).send('OK!');
  } catch (error) {
    next (error);
  };
};