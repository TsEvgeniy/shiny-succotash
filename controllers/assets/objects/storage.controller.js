const db = require('../../../models');

const ObjectsStorage = db.objectsStorage;

exports.allStorages = async (req, res, next) => {
  try {
    const result = await ObjectsStorage.find();
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

exports.addStorage = async (req, res, next) => {
  try {
    const Data = {
        locationOfStorage: req.body.locationOfStorage,
        nameOfStorage: req.body.nameOfStorage,
        dateOfCreation: req.body.dateOfCreation,
        numberOfOrder: req.body.numberOfOrder,
        dateOfOrder: req.body.dateOfOrder,
        typeOfStorage: req.body.typeOfStorage,
        responsibleEmployee: req.body.responsibleEmployee,
        assets: req.body.assets,
        republic: req.body.republic,
        region: req.body.region,
        district: req.body.district,
        address: req.body.address,
        cadastreNumber: req.body.cadastreNumber,
      },
      newData = new ObjectsStorage(Data);

    await newData.save();

    res.status(200).send(newData);
  } catch (error) {
    next(error);
  }
};

exports.updateStorage = (req, res, next) => {
  res.status(200).send('Update Storage');
};

exports.deleteStorage = (req, res, next) => {
  res.status(200).send('Delete Storage');
};
