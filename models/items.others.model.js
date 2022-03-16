const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  itemsOthersSchema = Schema(
    {
      id: String,
      stamp: String,
      model: String,
      yearOfProduction: String,
      numberOfTechniquePassport: Number,
      registrationNumber: Number,
      dateOfContractPurchasesSales: Number,
      numberofContractPurchasesSales: Number,
      amountOfContract: String,
      responsibleEmployee: {
        type: Schema.Types.ObjectId,
        ref: 'AllEmployee', // collection of employees
      },
    },
    {
      timestamps: true,
    }
  ),
  Items_Others = mongoose.model('Items_Others', itemsOthersSchema);

module.exports = Items_Others;
