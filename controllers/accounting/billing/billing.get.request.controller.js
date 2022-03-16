const {Api} = require('../../../helper/api.helper');

exports.billingGetRequest = async(req, res, next) => {
  try {

    // BILLING
//*********************************************************
    const resApiBilling = await Api({
      host: 'http://193.27.207.77:47080',
      url: '/get/contract',
      type: 'post',
      data: req.body,
      auth:"YXJjYTphcmNh"
    })
    console.log('ANSWER FROM BILLING SYSTEM_MERCHANT: ', resApiBilling);
//*********************************************************
    res.status(200).send(resApiBilling);

  } catch (error) {
    next(error);
  }
}