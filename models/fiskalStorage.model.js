const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const fiskalModStorageSchema = Schema({
  statusExisting: Number,
  fiskalMod: String,
  terminalSerialNumber: Number,
  terminal: {type: Schema.Types.ObjectId, ref: 'TerminalStorage'}
}, {
  timestamps: true
});

const FiskalModStorage = mongoose.model('FiskalModStorage', fiskalModStorageSchema);

module.exports = FiskalModStorage;