const db = require('../../../../models');

const Contracts_Administrative_Additional =
  db.contractsAdministrativeAdditional;
const Contracts_Administrative = db.contractsAdministrative;

exports.allAdministrativeAdditional = async (req, res, next) => {
  try {
    const additionalContracts = await Contracts_Administrative_Additional.find({
      mainContractId: req.params.id,
    });
    res.status(200).send(additionalContracts);
  } catch (error) {
    next(error);
  }
};

exports.addAdministrativeAdditional = async (req, res, next) => {
  try {
    const {
      uniqueCode,
      attachedEmployee,
      dateOfAdditonalContract,
      numberOfAdditonalContract,
      subjectOfAdditonalContract,
      mainContractId,
    } = req.body;

    const test_mainContract = await Contracts_Administrative.findById({
        _id: mainContractId,
      }),
      Data = {
        uniqueCode,
        attachedEmployee,
        dateOfAdditonalContract,
        numberOfAdditonalContract,
        subjectOfAdditonalContract,
        mainContractId,
        dateOfContract: test_mainContract.dateOfContract,
        numberOfContract: test_mainContract.numberOfContract,
        subjectOfContract: test_mainContract.subjectOfContract,
      };

    const newData = new Contracts_Administrative_Additional(Data);
    await newData.save();

    test_mainContract.additionalContracts.push(newData);

    await test_mainContract.save();

    res.status(200).send(test_mainContract);
  } catch (error) {
    next(error);
  }
};
