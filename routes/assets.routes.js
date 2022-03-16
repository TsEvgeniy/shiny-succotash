const { authJwt } = require('../middlewares');

const objects = require('../controllers/assets/objects/objects.controller');
const objectsBranch = require('../controllers/assets/objects/branch.controller');
const objectsStorage = require('../controllers/assets/objects/storage.controller');
const objectsOffice = require('../controllers/assets/objects/office.controller');

const assemblyRetrieve = require('../controllers/assets/assembly/retrieve.controller');
const assemblyRelease = require('../controllers/assets/assembly/release.controller');
const assemblyDefects = require('../controllers/assets/assembly/defects.controller');

const itemsOthers = require('../controllers/assets/items/others.controller');
const itemsInterior = require('../controllers/assets/items/interior.controller');
const itemsEquipmentTechAndEquip = require('../controllers/assets/items/equipment/equipment.techAndEquip.controller');
const itemsEquipmentFiskMod = require('../controllers/assets/items/equipment/equipment.fiskalMod.controller');
const itemsEquipmentTerminal = require('../controllers/assets/items/equipment/equipment.terminal.controller');

const ASSETS_ROUTE = '/api/assets';

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  //OBJECTS
  app.get(
    `${ASSETS_ROUTE}/objects`,
    [authJwt.verifyToken, authJwt.isObjectMod],
    objects.allObjects
  );
  app.post(
    `${ASSETS_ROUTE}/objects/add`,
    [authJwt.verifyToken, authJwt.isObjectMod],
    objects.addObject
  );
  app.post(
    `${ASSETS_ROUTE}/objects/update/:id`,
    [authJwt.verifyToken, authJwt.isObjectMod],
    objects.updateObject
  );
  app.delete(
    `${ASSETS_ROUTE}/objects/delete/:id`,
    [authJwt.verifyToken, authJwt.isObjectMod],
    objects.deleteObject
  );

  //OBJECTS_BRANCH
  app.get(
    `${ASSETS_ROUTE}/objects/branch`,
    [authJwt.verifyToken, authJwt.isObjectMod],
    objectsBranch.allBranches
  );
  app.post(
    `${ASSETS_ROUTE}/objects/branch/add`,
    [authJwt.verifyToken, authJwt.isObjectMod],
    objectsBranch.addBranch
  );

  app.post(
    `${ASSETS_ROUTE}/objects/branch/update/:id`,
    [authJwt.verifyToken, authJwt.isObjectMod],
    objectsBranch.updateBranch
  );
  app.delete(
    `${ASSETS_ROUTE}/objects/branch/delete/:id`,
    [authJwt.verifyToken, authJwt.isObjectMod],
    objectsBranch.deleteBranch
  );

  //OBJECTS_STORAGE
  app.get(
    `${ASSETS_ROUTE}/objects/storage`,
    [authJwt.verifyToken, authJwt.isObjectMod],
    objectsStorage.allStorages
  );
  app.post(
    `${ASSETS_ROUTE}/objects/storage/add`,
    [authJwt.verifyToken, authJwt.isObjectMod],
    objectsStorage.addStorage
  );
  app.post(
    `${ASSETS_ROUTE}/objects/storage/update/:id`,
    [authJwt.verifyToken, authJwt.isObjectMod],
    objectsStorage.updateStorage
  );
  app.delete(
    `${ASSETS_ROUTE}/objects/storage/delete/:id`,
    [authJwt.verifyToken, authJwt.isObjectMod],
    objectsStorage.deleteStorage
  );

  //OBJECTS_OFFICE
  app.get(
    `${ASSETS_ROUTE}/objects/office`,
    [authJwt.verifyToken, authJwt.isObjectMod],
    objectsOffice.allOffices
  );
  app.post(
    `${ASSETS_ROUTE}/objects/office/add`,
    [authJwt.verifyToken, authJwt.isObjectMod],
    objectsOffice.addOffice
  );
  app.post(
    `${ASSETS_ROUTE}/objects/office/update/:id`,
    [authJwt.verifyToken, authJwt.isObjectMod],
    objectsOffice.updateOffice
  );
  app.delete(
    `${ASSETS_ROUTE}/objects/office/delete/:id`,
    [authJwt.verifyToken, authJwt.isObjectMod],
    objectsOffice.deleteOffice
  );

  //RETRIEVE
  app.get(
    `${ASSETS_ROUTE}/assembly/retrieve`,
    [authJwt.verifyToken, authJwt.isAssemblyMod],
    assemblyRetrieve.allRetrieves
  );
  app.post(
    `${ASSETS_ROUTE}/assembly/retrieve/add`,
    [authJwt.verifyToken, authJwt.isAssemblyMod],
    assemblyRetrieve.addRetrieve
  );

  app.post(
    `${ASSETS_ROUTE}/assembly/retrieve/update/:id`,
    [authJwt.verifyToken, authJwt.isAssemblyMod],
    assemblyRetrieve.updateRetrieve
  );
  app.delete(
    `${ASSETS_ROUTE}/assembly/retrieve/delete/:id`,
    [authJwt.verifyToken, authJwt.isAssemblyMod],
    assemblyRetrieve.deleteRetrieve
  );

  //RELEASE
  app.get(
    `${ASSETS_ROUTE}/assembly/release`,
    [authJwt.verifyToken, authJwt.isUserAssemblyMod],
    assemblyRelease.allReleases
  );
  app.post(
    `${ASSETS_ROUTE}/assembly/release/add`,
    [authJwt.verifyToken, authJwt.isUserAssemblyMod],
    assemblyRelease.addRelease
  );

  app.post(
    `${ASSETS_ROUTE}/assembly/release/update/:id`,
    [authJwt.verifyToken, authJwt.isUserAssemblyMod],
    assemblyRelease.updateRelease
  );
  app.delete(
    `${ASSETS_ROUTE}/assembly/release/delete/:id`,
    [authJwt.verifyToken, authJwt.isUserAssemblyMod],
    assemblyRelease.deleteRelease
  );

  //DEFECTS
  app.get(
    `${ASSETS_ROUTE}/assembly/defects`,
    [authJwt.verifyToken, authJwt.isAssemblyMod],
    assemblyDefects.allDefects
  );
  app.post(
    `${ASSETS_ROUTE}/assembly/defects/add`,
    [authJwt.verifyToken, authJwt.isAssemblyMod],
    assemblyDefects.addDefect
  );
  app.post(
    `${ASSETS_ROUTE}/assembly/defects/update/:id`,
    [authJwt.verifyToken, authJwt.isAssemblyMod],
    assemblyDefects.updateDefect
  );
  app.delete(
    `${ASSETS_ROUTE}/assembly/defects/delete/:id`,
    [authJwt.verifyToken, authJwt.isAssemblyMod],
    assemblyDefects.deleteDefect
  );

  //OTHERS
  app.get(
    `${ASSETS_ROUTE}/items/others`,
    [authJwt.verifyToken, authJwt.isUserItemsMod],
    itemsOthers.allOthers
  );
  app.post(
    `${ASSETS_ROUTE}/items/others/add`,
    [authJwt.verifyToken, authJwt.isUserItemsMod],
    itemsOthers.addOther
  );

  app.post(
    `${ASSETS_ROUTE}/items/others/update/:id`,
    [authJwt.verifyToken, authJwt.isUserItemsMod],
    itemsOthers.updateOther
  );
  app.delete(
    `${ASSETS_ROUTE}/items/others/delete/:id`,
    [authJwt.verifyToken, authJwt.isUserItemsMod],
    itemsOthers.deleteOther
  );

  //INTERIOR
  app.get(
    `${ASSETS_ROUTE}/items/interior`,
    [authJwt.verifyToken, authJwt.isItemsMod],
    itemsInterior.allInteriors
  );
  app.post(
    `${ASSETS_ROUTE}/items/interior/add`,
    [authJwt.verifyToken, authJwt.isItemsMod],
    itemsInterior.addInterior
  );

  app.post(
    `${ASSETS_ROUTE}/items/interior/update/:id`,
    [authJwt.verifyToken, authJwt.isItemsMod],
    itemsInterior.updateInterior
  );
  app.delete(
    `${ASSETS_ROUTE}/items/interior/delete/:id`,
    [authJwt.verifyToken, authJwt.isItemsMod],
    itemsInterior.deleteInterior
  );

  //TECH AND EQUIP
  app.get(
    `${ASSETS_ROUTE}/items/equipment/techAndEquip`,
    [authJwt.verifyToken, authJwt.isUserItemsMod],
    itemsEquipmentTechAndEquip.allTechAndEquip
  );
  app.post(
    `${ASSETS_ROUTE}/items/equipment/techAndEquip/add`,
    [authJwt.verifyToken, authJwt.isUserItemsMod],
    itemsEquipmentTechAndEquip.addTechAndEquip
  );

  app.post(
    `${ASSETS_ROUTE}/items/equipment/techAndEquip/update/:id`,
    [authJwt.verifyToken, authJwt.isUserItemsMod],
    itemsEquipmentTechAndEquip.updateTechAndEquip
  );
  app.delete(
    `${ASSETS_ROUTE}/items/equipment/techAndEquip/delete/:id`,
    [authJwt.verifyToken, authJwt.isUserItemsMod],
    itemsEquipmentTechAndEquip.deleteTechAndEquip
  );

  //FISK MOD
  app.get(
    `${ASSETS_ROUTE}/items/equipment/fiskMod`,
    [authJwt.verifyToken, authJwt.isUserItemsMod],
    itemsEquipmentFiskMod.allFiskMod
  );
  app.post(
    `${ASSETS_ROUTE}/items/equipment/fiskMod/add`,
    [authJwt.verifyToken, authJwt.isUserItemsMod],
    itemsEquipmentFiskMod.addFiskMod
  );

  app.post(
    `${ASSETS_ROUTE}/items/equipment/fiskMod/update/:id`,
    [authJwt.verifyToken, authJwt.isUserItemsMod],
    itemsEquipmentFiskMod.updateFiskMod
  );
  app.delete(
    `${ASSETS_ROUTE}/items/equipment/fiskMod/delete/:id`,
    [authJwt.verifyToken, authJwt.isUserItemsMod],
    itemsEquipmentFiskMod.deleteFiskMod
  );

  //TERMINAL
  app.get(
    `${ASSETS_ROUTE}/items/equipment/terminals`,
    [authJwt.verifyToken, authJwt.isUserItemsMod],
    itemsEquipmentTerminal.allTerminals
  );
  app.post(
    `${ASSETS_ROUTE}/items/equipment/terminals/add`,
    [authJwt.verifyToken, authJwt.isUserItemsMod],
    itemsEquipmentTerminal.addTerminal
  );
  app.post(
    `${ASSETS_ROUTE}/items/equipment/terminals/update/:id`,
    [authJwt.verifyToken, authJwt.isUserItemsMod],
    itemsEquipmentTerminal.updateTerminal
  );
  app.delete(
    `${ASSETS_ROUTE}/items/equipment/terminals/delete/:id`,
    [authJwt.verifyToken, authJwt.isUserItemsMod],
    itemsEquipmentTerminal.deleteTerminal
  );
};
