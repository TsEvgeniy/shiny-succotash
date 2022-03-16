const db = require('../../../models');

const ObjectsBranch = db.objectsBranch;

exports.allBranches = async (req, res, next) => {
  try {
    const result = await ObjectsBranch.find();
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

exports.addBranch = async (req, res, next) => {
  try {
    const Data = {
        nameOfBranch: req.body.nameOfBranch,
        typeofBranch: req.body.typeofBranch,
        republic: req.body.republic,
        region: req.body.region,
        district: req.body.district,
        address: req.body.address,
        cadastreNumber: req.body.cadastreNumber,
        contractNumber: req.body.contractNumber,
        dataOfContract: req.body.dataOfContract,
        sumOfContract: req.body.sumOfContract,
        contractPeriod: req.body.contractPeriod,
        totalArea: req.body.totalArea,
        numberOfRooms: req.body.numberOfRooms,
        numberOfEmployees: req.body.numberOfEmployees,
        assets: req.body.assets,
      },
      newData = new ObjectsBranch(Data);

    await newData.save();

    res.status(200).send(newData);
  } catch (error) {
    next(error);
  }
};

exports.updateBranch = (req, res, next) => {
  res.status(200).send('Update Branch');
};

exports.deleteBranch = (req, res, next) => {
  res.status(200).send('Delete Branch');
};
