const db = require('../../../../models');

const ItemsEquipmentTerminal = db.itemsEquipmentDevices;

exports.allTerminals = async (req, res, next) => {
  try {
    const result = await ItemsEquipmentTerminal.find();
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

exports.addTerminal = async (req, res, next) => {
  try {
    const Data = {
        typeOfComing: req.body.typeOfComing,
        typeofDevice: req.body.typeofDevice,
        brand: req.body.brand,
        model: req.body.model,
        yearOfRelease: req.body.yearOfRelease,
        numberOfBatch: req.body.numberOfBatch,
        dateOfBatch: req.body.dateOfBatch,
        serialNumber: req.body.serialNumber,
        contractNumber: req.body.serialNumber,
        dateOfContract: req.body.dateOfContract,
        numberOfAct: req.body.numberOfAct,
        dateOfAct: req.body.dateOfAct,
        status: req.body.status,
      },
      newData = new ItemsEquipmentTerminal(Data);

    await newData.save();

    res.status(200).send(newData);
  } catch (error) {
    next(error);
  }
};

exports.updateTerminal = (req, res, next) => {
  res.status(200).send('Update Device');
};

exports.deleteTerminal = (req, res, next) => {
  res.status(200).send('Delete Device');
};
