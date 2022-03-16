const db = require('../../../models');

const ItemsOthers = db.itemsOthers;

exports.allOthers = async (req, res, next) => {
  try {
    const items = await ItemsOthers.find();
    res.status(200).send(items);
  } catch (error) {
    next(error);
  }
};

exports.addOther = async (req, res, next) => {
  try {
    const Data = {
        stamp: req.body.stamp,
        model: req.body.model,
        yearOfProduction: req.body.yearOfProduction,
        numberOfTechniquePassport: req.body.numberOfTechniquePassport,
        registrationNumber: req.body.registrationNumber,
        dateOfContractPurchasesSales: req.body.dateOfContractPurchasesSales,
        numberofContractPurchasesSales: req.body.numberofContractPurchasesSales,
        amountOfContract: req.body.amountOfContract,
      },
      newData = await ItemsOthers(Data);

    await newData.save();

    res.status(200).send(newData);
  } catch (error) {
    next(error);
  }
};

exports.updateOther = (req, res, next) => {
  res.status(200).send('Update Other');
};

exports.deleteOther = (req, res, next) => {
  res.status(200).send('Delete Others');
};
