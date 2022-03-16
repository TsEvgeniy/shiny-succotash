exports.allPayments = (req, res, next) => {
    res.status(200).send('All Payments');
};

exports.addPayment = (req, res, next) => {
    res.status(200).send('Add Payment');
};

exports.updatePayment = (req, res, next) => {
    res.status(200).send('Update Payment');
};

exports.deletePayment = (req, res, next) => {
    res.status(200).send('Delete Payment');
};