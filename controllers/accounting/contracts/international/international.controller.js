const db = require('../../../../models');

const ContractsInternational = db.contractsInternational;

exports.allInternational = async (req, res, next) => {
  try {
    const contracts = await ContractsInternational.find();
    res.status(200).send(contracts);
  } catch (error) {
    next(error);
  }
};

exports.addInternational = async (req, res, next) => {
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
      rc: req.body.rc, //P/C
      oked: req.body.oked,
      phoneNumber: req.body.phoneNumber,
      web: req.body.web,
      email: req.body.email,
      additionalContract: req.body.additionalContract,
    };

    const newData = new ContractsInternational(Data);
    await newData.save();

    res.status(200).send(newData);
  } catch (error) {
    next(error);
  }
};

exports.updateInternational = (req, res, next) => {
  res.status(200).send('Update International');
};

exports.deleteInternational = (req, res, next) => {
  res.status(200).send('Delete International');
};
