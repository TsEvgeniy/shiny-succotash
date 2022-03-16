const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require('./user.model');
db.role = require('./role.model');
db.merchant = require('./merchant.model');
db.store = require('./store.model');
db.terminal = require('./terminal.model');
db.terminalStorage = require('./terminalStorage.model');
db.fiskalModStorage = require('./fiskalStorage.model');
db.balanceTest = require('./balance.test.model');
db.assemblyRetrieve = require('./assembly.retrieve.model');
db.assemblyRelease = require('./assembly.release.model');
db.assemblyDefects = require('./assembly.defects.model');
db.contractsAdministrative = require('./contracts.administrative.model');
db.contractsAdministrativeAdditional = require('./contracts.administrative.additional.model');
db.contractsInternational = require('./contracts.international.model');
db.contractsInternationalAdditional = require('./contracts.international.additional.model');
db.itemsEquipmentTechAndDev = require('./items.equipment.techAndDev.model');
db.itemsEquipmentFiskalMod = require('./items.equipment.fiskalMod.model');
db.itemsEquipmentDevices = require('./items.equipment.devices.model');
db.itemsInterior = require('./items.interior.model');
db.itemsOthers = require('./items.others.model');
db.objectsBranch = require('./objects.branch.model');
db.objectsStorage = require('./objects.storage.model');
db.objectsOffice = require('./objects.office.model');

db.ROLES = [
  'assets_mod',
  'admin',
  'accounting_mod',
  'sales_mod',
  'hr_mod',
  'edm_mod',
  'tools_mod',
  'object_mod',
  'assembly_mod',
  'billing_mod',
  'contracts_mod',
  'support_lite_mod',
  'support_pro_mod',
  'support_repair_mod',
  'user_assembly_mod',
  'user_items_mod',
  'cto_mod',
  'items_mod',
  'e-bank_mod',
];

module.exports = db;
