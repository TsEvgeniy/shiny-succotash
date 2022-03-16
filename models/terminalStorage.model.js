const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const terminalStorageSchema = Schema({
  statusExisting: Number,
  serialNumber: Number,
  fiskalModNumber: String,
  fiskalMod:{type: Schema.Types.ObjectId, ref: 'FiskalModStorage'}
}, {
  timestamps: true
});

const TerminalStorage = mongoose.model('TerminalStorage', terminalStorageSchema);

module.exports = TerminalStorage;