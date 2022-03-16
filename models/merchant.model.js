const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const merchantSchema = Schema(
  {
    MID: Number, //unique ID for merchant. Own mongo ID will use only for internal operations, and MID for external;
    opMapId: Number,
    userMobile: Number,
    userPasswd: String,
    nickName: String,
    thirdMapId: Number,
    thirdMapName: String,
    merMapId: String,
    tin: Number,
    pinfl: Number,
    passFile: { name: String, source: String },
    partner: { type: Schema.Types.ObjectId, ref: 'User' },
    partnerId: String,
    stores: [{ type: Schema.Types.ObjectId, ref: 'Store' }],
    terminals: [{ type: Schema.Types.ObjectId, ref: 'Terminal' }],
    botChatId: String,
  },
  {
    timestamps: true,
  }
);

const Merchant = mongoose.model('Merchant', merchantSchema);

module.exports = Merchant;
