const db = require('../../../../models');

const ContractsInternationalAdditional = db.contractsInternationalAdditional;
const ContractsInternational = db.contractsInternational;

exports.allInternationalAdditional = async (req, res, next) => {
  try {
    const additionalContracts = await ContractsInternationalAdditional.find({
      mainContractId: req.params.id,
    });
    res.status(200).send(additionalContracts);
  } catch (error) {
    next(error);
  }
};

exports.addInternationalAdditional = async (req, res, next) => {
  try {
    const {
      uniqueCode,
      attachedEmployee,
      dateOfAdditonalContract,
      numberOfAdditonalContract,
      subjectOfAdditonalContract,
      mainContractId,
    } = req.body;

    console.log(mainContractId);

    const test_mainContract = await ContractsInternational.findById({
      _id: mainContractId,
    });

    console.log(test_mainContract);

    const Data = {
      uniqueCode,
      //attachedEmployee,
      dateOfAdditonalContract,
      numberOfAdditonalContract,
      subjectOfAdditonalContract,
      mainContractId,
      dateOfContract: test_mainContract.dateOfContract,
      numberOfContract: test_mainContract.numberOfContract,
      subjectOfContract: test_mainContract.subjectOfContract,
    };

    const newData = new ContractsInternationalAdditional(Data);
    await newData.save();

    test_mainContract.additionalContracts.push(newData);

    await test_mainContract.save();

    res.status(200).send(test_mainContract);
  } catch (error) {
    next(error);
  }
};
