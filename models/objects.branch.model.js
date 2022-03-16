const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  objectsBranchSchema = Schema(
    {
      id: Number,
      nameOfBranch: String,
      typeofBranch: String,
      republic: String,
      region: String,
      district: String,
      address: String,
      cadastreNumber: String,
      contractNumber: String,
      dataOfContract: Number,
      sumOfContract: Number,
      contractPeriod: Number,
      totalArea: Number,
      numberOfRooms: Number,
      numberOfEmployees: Number,
      assets: String,
    },
    {
      timestamps: true,
    }
  ),
  Objects_Branch = mongoose.model('Objects_Branch', objectsBranchSchema);

module.exports = Objects_Branch;
