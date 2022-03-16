const db = require('../../../../models');

const ContractsAdministrative = db.contractsAdministrative;

exports.allAdministrative = async (req, res, next) => {
  try {
    const total = await ContractsAdministrative.find().countDocuments();
    const limit = 10;
    const skip = (parseInt(req.query.page) || 0) * limit;
    const contracts = await ContractsAdministrative.find()
      .skip(skip)
      .limit(limit);
    res.status(200).send({ data: contracts, total });
  } catch (error) {
    next(error);
  }
};

exports.addAdministrative = async (req, res, next) => {
  try {
    const Data = {
      uniqueCode: req.body.uniqueCode,
      //attachedEmployee: req.body.attachedEmployee,
      type: req.body.type,
      kindOfContract: req.body.kindOfContract,
      dateOfContract: req.body.dateOfContract,
      numberOfContract: req.body.numberOfContract,
      subjectOfContract: req.body.subjectOfContract,
      term: req.body.term,
      quantityOfSides: req.body.quantityOfSides,
      secondSide: req.body.secondSide,
      roleOfSecondSide: req.body.roleOfSecondSide,
      thirdSide: req.body.thirdSide,
      roleOfThirdSide: req.body.roleOfThirdSide,
      score: req.body.score,
      sum: req.body.sum,
      equivalent: req.body.equivalent,
      periodicity: req.body.periodicity,
      coefficientOfPrepayment: req.body.coefficientOfPrepayment,
      paymentOfPrepayment: req.body.paymentOfPrepayment,
      dateOfPrepayment: req.body.dateOfPrepayment,
      numberOfPrepaymentOrder: req.body.numberOfPrepaymentOrder,
      finalPayment: req.body.finalPayment,
      dateOfFinalPayment: req.body.dateOfFinalPayment,
      numberOfFinalPaymentOrder: req.body.numberOfFinalPaymentOrder,
      dateOfInvoice: req.body.dateOfInvoice,
      numberOfInvoice: req.body.numberOfInvoice,
      dateOfActCompletionAcceptanceTransfer:
        req.body.dateOfActCompletionAcceptanceTransfer,
      state: req.body.state,
      statusOfSecondSide: req.body.statusOfSecondSide,
      name: req.body.name,
      tin: req.body.tin,
      address: req.body.address,
      bank: req.body.bank,
      mfo: req.body.mfo,
      rc: req.body.rc,
      oked: req.body.oked,
      phoneNumber: req.body.phoneNumber,
      web: req.body.web,
      email: req.body.email,
      additionalContract: req.body.additionalContract,
    };

    const newData = new ContractsAdministrative(Data);
    await newData.save();

    res.status(200).send(newData);
  } catch (error) {
    next(error);
  }
};

exports.updateAdministrative = (req, res, next) => {
  res.status(200).send('Update Administrative');
};

exports.deleteAdministrative = (req, res, next) => {
  res.status(200).send('Delete Administrative');
};
