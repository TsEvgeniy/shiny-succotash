const db = require('../../../../models');

const ItemsEquipmentTechAndDev = db.itemsEquipmentTechAndDev;

exports.allTechAndEquip = async (req, res, next) => {
  try {
    const items = await ItemsEquipmentTechAndDev.find();
    res.status(200).send(items);
  } catch (error) {
    next(error);
  }
};

exports.addTechAndEquip = async (req, res, next) => {
  try {
    const Data = {
        title: req.body.title,
        type: req.body.type,
        brand: req.body.brand,
        model: req.body.model,
        yearOfRelease: req.body.yearOfRelease,
        dateOfContract: req.body.dateOfContract,
        numberOfContract: req.body.numberOfContract,
        price: req.body.price,
        specifications: req.body.specifications,
        cpu: req.body.cpu,
        ram: req.body.ram,
        os: req.body.os,
        memory: req.body.memory,
        name: req.body.name,
        networkAddress: req.body.networkAddress,
        responsibleEmployee: req.body.responsibleEmployee,
        inventoryNumber: req.body.inventoryNumber,
        lastInventory: req.body.lastInventory,
        state: req.body.state,
        status: req.body.status,
      },
      newData = new ItemsEquipmentTechAndDev(Data);

    await newData.save();

    res.status(200).send(newData);
  } catch (error) {
    next(error);
  }
};

exports.updateTechAndEquip = (req, res, next) => {
  res.status(200).send('Update Tech');
};

exports.deleteTechAndEquip = (req, res, next) => {
  res.status(200).send('Delete Tech');
};
