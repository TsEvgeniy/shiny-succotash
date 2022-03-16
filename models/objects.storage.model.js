const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  objectsStorageSchema = Schema(
    {
      id: Number,
      locationOfStorage: String,
      nameOfStorage: String,
      dateOfCreation: Number,
      numberOfOrder: String,
      dateOfOrder: Number,
      typeOfStorage: String,
      responsibleEmployee: {
        type: Schema.Types.ObjectId,
        ref: 'AllEmployee', // collection of employees
      },
      assets: String,
      republic: String,
      region: String,
      district: String,
      address: String,
      cadastreNumber: String,
    },
    {
      timestamps: true,
    }
  ),
  Objects_Storage = mongoose.model('Objects_Storage', objectsStorageSchema);

module.exports = Objects_Storage;
