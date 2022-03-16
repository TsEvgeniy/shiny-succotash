const db = require('../../../../models');

const ItemsEquipmentFM = db.itemsEquipmentFiskalMod;

exports.allFiskMod = async (req, res, next) => {
  try {
    const result = await ItemsEquipmentFM.find();
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

exports.addFiskMod = async (req, res, next) => {
  try {
    const Data = {
        typeOfComing: req.body.typeOfComing,
        typeOfDevice: req.body.typeOfDevice,
        dateOfRelease: req.body.dateOfRelease,
        numberOfBatch: req.body.numberOfBatch,
        dateOfBatch: req.body.dateOfBatch,
        serialNumber: req.body.serialNumber,
        contractNumber: req.body.contractNumber,
        dateOfContract: req.body.dateOfContract,
        numberOfAct: req.body.numberOfAct,
        dateOfAct: req.body.dateOfAct,
        //responsibleEmployee: req.body.responsibleEmployee,
        status: req.body.status,
      },
      newData = new ItemsEquipmentFM(Data);

    await newData.save(newData);

    res.status(200).send(newData);
  } catch (error) {
    next(error);
  }
};

exports.updateFiskMod = (req, res, next) => {
  res.status(200).send('Update FiskMod');
};

exports.deleteFiskMod = (req, res, next) => {
  res.status(200).send('Delete FiskMod');
};
