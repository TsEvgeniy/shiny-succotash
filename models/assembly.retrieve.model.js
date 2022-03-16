const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  assemblyRetrieveSchema = Schema(
    {
      id: Number,
      incomingType: String,
      sparePartType: String,
      category: String,
      model: String,
      year: Number,
      batchNum: String,
      batchDate: Number,
      quantity: Number,
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
  Assembly_Retrieve = mongoose.model(
    'Assembly_Retrieve',
    assemblyRetrieveSchema
  );

module.exports = Assembly_Retrieve;
