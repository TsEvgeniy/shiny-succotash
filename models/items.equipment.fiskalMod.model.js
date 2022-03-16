const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  itemsEquipmentFiskalModSchema = Schema(
    {
      id: Number,
      typeOfComing: String,
      typeOfDevice: String,
      dateOfRelease: Number,
      numberOfBatch: String,
      dateOfBatch: Number,
      serialNumber: String,
      contractNumber: String,
      dateOfContract: Number,
      numberOfAct: String,
      dateOfAct: Number,
      responsibleEmployee: {
        type: Schema.Types.ObjectId,
        ref: 'AllEmployee', // collection of employees
      },
      status: String,
    },
    {
      timestamps: true,
    }
  ),
  Items_Equipment_FiskalMod = mongoose.model(
    'Items_Equipment_FiskalMod',
    itemsEquipmentFiskalModSchema
  );

module.exports = Items_Equipment_FiskalMod;
