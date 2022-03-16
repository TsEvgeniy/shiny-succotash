const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  contractsInternationalAdditionalSchema = Schema(
    {
      id: Number,
      uniqueCode: String,
      attachedEmployee: { type: Schema.Types.ObjectId, ref: 'AllEmployee' }, // collection of employees
      dateOfContract: Number,
      numberOfContract: Number,
      subjectOfContract: String,
      dateOfAdditonalContract: Number,
      numberOfAdditonalContract: Number,
      subjectOfAdditonalContract: String,
      mainContractId: String,
      contractInternational: {
        type: Schema.Types.ObjectId,
        ref: 'Contracts_International',
      },
    },
    { timestamps: true }
  ),
  Contracts_International_Additional = mongoose.model(
    'Contracts_International_Additional',
    contractsInternationalAdditionalSchema
  );

module.exports = Contracts_International_Additional;
