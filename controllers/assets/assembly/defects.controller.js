const db = require('../../../models');

const AssemblyDefects = db.assemblyDefects;

exports.allDefects = async (req, res, next) => {
  try {
    const result = await AssemblyDefects.find();
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

exports.addDefect = async (req, res, next) => {
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
      newData = new AssemblyDefects(Data);

    await newData.save();

    res.status(200).send(newData);
  } catch (error) {
    next(error);
  }
};

exports.updateDefect = (req, res, next) => {
  res.status(200).send('Update Defect');
};

exports.deleteDefect = (req, res, next) => {
  res.status(200).send('Delete Defect');
};
