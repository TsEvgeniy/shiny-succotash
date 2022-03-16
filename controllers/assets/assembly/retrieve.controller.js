const db = require('../../../models');

const AssemblyRetrieve = db.assemblyRetrieve;

exports.allRetrieves = async (req, res, next) => {
  try {
    const result = await AssemblyRetrieve.find();
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

exports.addRetrieve = async (req, res, next) => {
  try {
    const Data = {
        incomingType: req.body.incomingType,
        sparePartType: req.body.sparePartType,
        category: req.body.category,
        model: req.body.model,
        year: req.body.year,
        batchNum: req.body.batchNum,
        batchDate: req.body.batchDate,
        quantity: req.body.quantity,
        contractNum: req.body.contractNum,
        contractDate: req.body.contractDate,
        actNum: req.body.actNum,
        actDate: req.body.actDate,
        respEmp: req.body.respEmp,
        status: req.body.status,
      },
      newData = new AssemblyRetrieve(Data);

    await newData.save();

    res.status(200).send(newData);
  } catch (error) {
    next(error);
  }
};

exports.updateRetrieve = (req, res, next) => {
  res.status(200).send('Update Retrieve');
};

exports.deleteRetrieve = (req, res, next) => {
  res.status(200).send('Delete Retrieve');
};
