const db = require('../../../models');

const AssemblyRelease = db.assemblyRelease;

exports.allReleases = async (req, res, next) => {
  try {
    const result = await AssemblyRelease.find();
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

exports.addRelease = async (req, res, next) => {
  try {
    const Data = {
        incomingType: req.body.incomingType,
        deviceType: req.body.deviceType,
        brand: req.body.brand,
        model: req.body.model,
        year: req.body.year,
        batchNum: req.body.batchNum,
        batchDate: req.body.batchDate,
        serialNum: req.body.serialNum,
        contractNum: req.body.contractNum,
        contractDate: req.body.contractDate,
        actNum: req.body.actNum,
        actDate: req.body.actDate,
        respEmp: req.body.respEmp,
        status: req.body.status,
      },
      newData = new AssemblyRelease(Data);

    await newData.save();

    res.status(200).send(newData);
  } catch (error) {
    next(error);
  }
};

exports.updateRelease = (req, res, next) => {
  res.status(200).send('Update Release');
};

exports.deleteRelease = (req, res, next) => {
  res.status(200).send('Delete Release');
};
