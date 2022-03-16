const db = require('../../../models');

const ObjectsOffice = db.objectsOffice;

exports.allOffices = async (req, res, next) => {
  try {
    const result = await ObjectsOffice;
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

exports.addOffice = async (req, res, next) => {
  try {
    const Data = {
        nameOfOffice: req.body.nameOfOffice,
        typeOfOffice: req.body.typeOfOffice,
        republic: req.body.republic,
        region: req.body.region,
        district: req.body.district,
        address: req.body.address,
        cadastreNumber: req.body.cadastreNumber,
        totalArea: req.body.totalArea,
        numberOfRooms: req.body.numberOfRooms,
        numberOfEmployees: req.body.numberOfEmployees,
        assets: req.body.assets,
      },
      newData = new ObjectsOffice(Data);

    await newData.save();

    res.status(200).send(newData);
  } catch (error) {
    next(error);
  }
};

exports.updateOffice = (req, res, next) => {
  res.status(200).send('Update Office');
};

exports.deleteOffice = (req, res, next) => {
  res.status(200).send('Delete Office');
};
