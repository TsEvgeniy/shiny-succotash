const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  itemsInteriorSchema = Schema(
    {
      id: String,
      naming: String,
      type: String,
      brand: String,
      model: String,
      yearOfRelease: Number,
      dateOfContract: Number,
      numberOfContract: String,
      price: String,
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
  Items_Interior = mongoose.model('Items_Interior', itemsInteriorSchema);

module.exports = Items_Interior;
