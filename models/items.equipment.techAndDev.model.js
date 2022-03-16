const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  itemsEquipmentTechAndDevSchema = Schema(
    {
      id: Number,
      title: String,
      type: String,
      brand: String,
      model: String,
      yearOfRelease: Number,
      dateOfContract: Number,
      numberOfContract: String,
      price: String,
      specifications: String,
      cpu: String,
      ram: String,
      os: String,
      memory: String,
      name: String,
      networkAddress: String,
      responsibleEmployee: {
        type: Schema.Types.ObjectId,
        ref: 'AllEmployee', // collection of employees
      },
      inventoryNumber: String,
      lastInventory: String,
      state: String,
      status: String,
    },
    {
      timestamps: true,
    }
  ),
  Items_Equipment_TechAndDev = mongoose.model(
    'Items_Equipment_TechAndDev',
    itemsEquipmentTechAndDevSchema
  );

module.exports = Items_Equipment_TechAndDev;
