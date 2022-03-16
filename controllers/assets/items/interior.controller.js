const db = require('../../../models');

const ItemsInterior = db.itemsInterior;

exports.allInteriors = async (req, res, next) => {
  try {
    const items = await ItemsInterior.find();
    res.status(200).send(items);
  } catch (error) {
    next(error);
  }
};

exports.addInterior = async (req, res, next) => {
  try {
    const Data = {
        naming: req.body.naming,
        type: req.body.type,
        brand: req.body.brand,
        model: req.body.model,
        yearOfRelease: req.body.yearOfRelease,
        dateOfContract: req.body.dateOfContract,
        numberOfContract: req.body.numberOfContract,
        price: req.body.price,
        inventoryNumber: req.body.inventoryNumber,
        lastInventory: req.body.lastInventory,
        state: req.body.state,
        status: req.body.status,
      },
      newData = new ItemsInterior(Data);

    await newData.save();

    res.status(200).send(newData);
  } catch (error) {
    next(error);
  }
};

exports.updateInterior = (req, res, next) => {
  res.status(200).send('Update Interior');
};

exports.deleteInterior = (req, res, next) => {
  res.status(200).send('Delete Interior');
};
