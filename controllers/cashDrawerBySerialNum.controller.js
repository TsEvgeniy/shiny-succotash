const db = require('../models');

const Terminal = db.terminal;

exports.allTIDandMIDbyCashDrawerSerialNumber = async (req, res, next) => {
  try {
    // console.log('serial num is: ', req.params.id);
    const data = await Terminal.findOne({machineNo: `${req.params.id}`})
      .populate('merchant');
    console.log('Data is: ', data);
    res.status(200).send({
      terminalId: data.TID,
      modelNo: data.modelNo,
      machineNo: data.machineNo,
      merchantName: data.merchant.nickName,
      merchantId: data.merchant.MID
    });
  } catch (error) {
    next(error);
  };
};