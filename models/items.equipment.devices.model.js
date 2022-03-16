const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  itemsEquipmentDevicesSchema = Schema(
    {
      id: Number,
      typeOfComing: String,
      typeofDevice: String,
      brand: String,
      model: String,
      yearOfRelease: Number,
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
  Items_Equipment_Devices = mongoose.model(
    'Items_Equipment_Devices',
    itemsEquipmentDevicesSchema
  );

module.exports = Items_Equipment_Devices;
