const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const balanceTestSchema = Schema({
  balance: Number,
  payment: Number,
  dateOfPayment: String
}, {
  timestamps: true
});

const BalanceTest = mongoose.model('BalanceSchema', balanceTestSchema);

module.exports = BalanceTest;