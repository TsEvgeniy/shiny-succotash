const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  contractsInternationalSchema = Schema(
    {
      id: Number,
      uniqueCode: String,
      attachedEmployee: { type: Schema.Types.ObjectId, ref: 'AllEmployee' }, // collection of employees
      type: String,
      kindOfContract: String,
      dateOfContract: Number,
      numberOfContract: String,
      subjectOfContract: String,
      term: String,
      quantityOfSides: String,
      secondSide: String,
      roleOfSecondSide: String,
      thirdSide: String,
      roleOfThirdSide: String,
      score: String,
      sum: String,
      equivalent: String,
      periodicity: String,
      coefficientOfPrepayment: String,
      paymentOfPrepayment: String,
      dateOfPrepayment: Number,
      numberOfPrepaymentOrder: String,
      finalPayment: String,
      dateOfFinalPayment: Number,
      numberOfFinalPaymentOrder: String,
      dateOfInvoice: Number,
      numberOfInvoice: String,
      dateOfActCompletionAcceptanceTransfer: Number,
      state: String,
      statusOfSecondSide: String,
      name: String,
      tin: String,
      address: String,
      bank: String,
      mfo: String,
      rc: String, //P/C
      oked: String,
      phoneNumber: String,
      web: String,
      email: String,
      additionalContracts: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Contracts_International_Additional',
        },
      ],
    },
    {
      timestamps: true,
    }
  ),
  Contracts_International = mongoose.model(
    'Contracts_International',
    contractsInternationalSchema
  );

module.exports = Contracts_International;
