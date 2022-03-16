const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  objectsOfficeSchema = Schema(
    {
      id: Number,
      nameOfOffice: String,
      typeOfOffice: String,
      republic: String,
      region: String,
      district: String,
      address: String,
      cadastreNumber: String,
      totalArea: Number,
      numberOfRooms: Number,
      numberOfEmployees: Number,
      assets: String,
    },
    {
      timestamps: true,
    }
  ),
  Objects_Office = mongoose.model('Objects_Office', objectsOfficeSchema);

module.exports = Objects_Office;
