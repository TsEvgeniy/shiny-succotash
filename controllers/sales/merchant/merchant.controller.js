const querystring = require('querystring');
const sha1 = require('sha1');
const md5 = require('md5');
const uploadFile = require('../../../middlewares/upload');
const db = require('../../../models');
const dotenv = require('dotenv');
const { Api } = require('../../../helper/api.helper');
const { getRandID } = require('../../../middlewares/tidAndMidGenerator');

dotenv.config();

const Merchant = db.merchant;
const baseUrl = process.env.BASE_URL;

exports.allMerchants = async (req, res, next) => {
  try {
    const merchants = await Merchant.find().populate('partner');

    // console.log('Partner from merchant controller: ', merchants);

    let newMerchants = [];

    merchants.forEach(element => {
      newMerchants.push({
        passFile: element.passFile,
        terminals: element.terminals,
        _id: element._id,
        opMapId: element.opMapId,
        userMobile: element.userMobile,
        userPasswd: element.userPasswd,
        nickName: element.nickName,
        tin: element.tin,
        pinfl: element.pinfl,
        partnerId: element.partnerId,
        partnerName: element.partner.username,
        partnerPhone: element.partner.phoneNumber,
        stores: element.stores,
      });
    });

    // console.log('newMerchants is: ', newMerchants);

    res.status(200).send(newMerchants);
  } catch (error) {
    next(error);
  }
};

exports.addMerchant = async (req, res, next) => {
  await uploadFile(req, res);

  const partnerId = req.userId,
    appsecret = process.env.APPSECRET,
    { nickName, userPasswd, userMobile, tin, pinfl } = req.body,
    tindaDataMerchant = {
      opMapId: 10000001,
      nickName,
      userMobile,
      userPasswd: md5(userPasswd).toUpperCase(),
      time: Math.floor(new Date().getTime() / 1000),
      thirdMapId: 15632564,
      thirdMapName: 'KFCaa',
    },
    {} = req.body,
    ordered = Object.keys(tindaDataMerchant)
      .sort()
      .reduce((obj, key) => {
        obj[key] = tindaDataMerchant[key];
        return obj;
      }, {}),
    sign = sha1(
      querystring.stringify(ordered, null, null, {
        encodeURIComponent: querystring.unescape,
      }) + appsecret
    );

  tindaDataMerchant.sign = sign;

  // TINDA
  //******************************************************
  //   const resApiTinda = await Api({
  //     host: 'http://ds.51zzd.com',
  //     url: '/control/api/mer/add',
  //     type: 'post',
  //     data:tindaDataMerchant
  //   });
  //
  //   console.log('MERCHANT FROM TINDA: ', resApiTinda);
  //******************************************************

  if (!req.files[0]) {
    req.files.push({ filename: 'NO_FILE' });
  }

  const MID = getRandID(15),
    existingMerchant = await Merchant.findOne({ MID: MID });

  let Data = {
    opMapId: tindaDataMerchant.opMapId,
    userMobile,
    userPasswd: md5(userPasswd).toUpperCase(),
    nickName,
    thirdMapId: tindaDataMerchant.thirdMapId,
    thirdMapName: tindaDataMerchant.thirdMapName,
    merMapId: 600 /*resApiTinda.data.merMapId,*/ /*600*/,
    tin,
    pinfl,
    passFile: {
      name: req.files[0].filename,
      source: baseUrl + req.files[0].filename,
    },
    partnerId,
    partner: partnerId,
  };

  if (existingMerchant == null) {
    Data.MID = MID;
  } else Data.MID = getRandID(8);

  // console.log(' -------MERCHANT_Data for arcanaDB is: ', Data);

  const newMerchant = new Merchant(Data);
  await newMerchant.save();

  console.log(' -------NEW_MERCHANT_Data for arcanaDB is: ', newMerchant);

  let billingUserMobile = newMerchant.userMobile;
  billingUserMobile = billingUserMobile.toString().slice(2);
  billingUserMobile = +billingUserMobile;
  console.log(billingUserMobile, typeof billingUserMobile);

  const billingData = {
    merchant_id: newMerchant._id,
    userMobile: billingUserMobile,
    nickName,
    tin,
  };

  // BILLING
  //*********************************************************
  const resApiBilling = await Api({
    host: 'http://193.27.207.77:47080',
    url: '/insert/merchant',
    type: 'post',
    data: billingData,
    auth: 'YXJjYTphcmNh',
  });
  console.log('ANSWER FROM BILLING SYSTEM_MERCHANT: ', resApiBilling);
  //*********************************************************

  res.status(200).send({
    _id: newMerchant._id,
    merMapId: 600 /*resApiTinda.data.merMapId*/ /*600*/,
  });
};
