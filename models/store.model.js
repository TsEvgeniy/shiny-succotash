const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const storeSchema = Schema({
  opMapId: Number,
  shopName: String,
  mccId: Number,
  mccName: String,
  cityCountyId: Number,
  cityAddress: String,
  merMapId: String,
  shopMapId: Number,
  activityGroup: String,
  activityGroupName: String,
  activityType: String,
  activityTypeName: String,
  cadastreNumber: String,
  districtCode: String,
  districtName: String,
  docCadastre: { name:String, source: String },
  nomenclature: { name: String, source: String },
  latitude: String,
  longitude: String,
  regionCode: String,
  regionName: String,
  tin: Number,
  pinfl: Number,
  time: String,
  officeId: String,
  merchantId: String,
  partnerId: String,
  terminals: [{type:Schema.Types.ObjectId, ref: 'Terminal'}],
  merchant: {type:Schema.Types.ObjectId, ref:'Merchant'},
  partner: {type: Schema.Types.ObjectId, ref: 'User'},
},{
  timestamps:true
});

const Store = mongoose.model('Store', storeSchema);

module.exports = Store;