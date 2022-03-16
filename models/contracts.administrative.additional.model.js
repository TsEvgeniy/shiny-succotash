const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  contractsAdministrativeAdditionalSchema = Schema(
    {
      id: Number,
      uniqueCode: String,
      attachedEmployee: { type: Schema.Types.ObjectId, ref: 'AllEmployee' }, // collection of employees
      dateOfContract: Number,
      numberOfContract: String,
      subjectOfContract: String,
      dateOfAdditonalContract: Number,
      numberOfAdditonalContract: String,
      subjectOfAdditonalContract: String,
      mainContractId: String,
      contractAdministrative: {
        type: Schema.Types.ObjectId,
        ref: 'Contracts_Administrative',
      },
    },
    {
      timestamps: true,
    }
  ),
  Contracts_Administrative_Additional = mongoose.model(
    'Contracts_Administrative_Additional',
    contractsAdministrativeAdditionalSchema
  );

module.exports = Contracts_Administrative_Additional;
