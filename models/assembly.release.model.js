const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  assemblyReleaseSchema = Schema(
    {
      id: Number,
      incomingType: String,
      deviceType: String,
      brand: String,
      model: String,
      year: Number,
      batchNum: String,
      batchDate: Number,
      serialNum: String,
      contractNum: String,
      contractDate: Number,
      actNum: String,
      actDate: Number,
      respEmp: { type: Schema.Types.ObjectId, ref: 'AllEmployee' },
      status: String,
    },
    {
      timestamps: true,
    }
  ),
  Assembly_Release = mongoose.model('Assembly_Release', assemblyReleaseSchema);

module.exports = Assembly_Release;
