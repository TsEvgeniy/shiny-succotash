const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const terminalSchema = Schema({
  TID: Number,  //unique ID for terminal. Own mongo ID will use only for internal operations, and TID for external;
  opMapId: Number,
  modelNo: String,
  machineNo: String,
  fiskalMod: String,
  shopMapId: Number,
  merMapId: String,
  applicationFile: { name:String, source:String },
  contractFile: { name:String, source:String },
  formCTO: { name:String, source:String },
  time: String,
  shopId: String,
  merchantId: String,
  tin: Number,
  pinfl: Number,
  partnerId: String,
  phone: String,
  store: {type: Schema.Types.ObjectId, ref: 'Store'},
  merchant:{type: Schema.Types.ObjectId, ref: 'Merchant'},
  partner: {type: Schema.Types.ObjectId, ref: 'User'},
  status: Number,
  statusDesc: String,
  applicationId: String,
  registrationCardUrl: String,
  contractNumber: String,
  date: Number,
  typeOfApplication: String,
  balance: Number,
},{
  timestamps:true
});

const Terminal = mongoose.model('Terminal', terminalSchema);

module.exports = Terminal;