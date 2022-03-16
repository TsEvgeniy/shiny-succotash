const querystring = require('querystring');
const sha1 = require('sha1');
const md5 = require('md5');
const db = require('../../../models')
const dotenv = require('dotenv');
const { Api } = require('../../../helper/api.helper');
const { getRandID } = require('../../../middlewares/tidAndMidGenerator');

dotenv.config();

const Merchant = db.merchant;

exports.addMerchantBot = async (req, res, next) => {
  const partnerId = req.userId,
    appsecret = process.env.APPSECRET,
    {
      nickName,
      userPasswd,
      userMobile,
      tin,
      chatId
    } = req.body,
    tindaDataMerchant = {
      opMapId: 10000001,
      nickName,
      userMobile,
      userPasswd: md5(userPasswd).toUpperCase(),
      time: Math.floor(new Date().getTime() / 1000),
      thirdMapId: 15632564,
      thirdMapName: "KFCaa"
    },
    {} = req.body,
    ordered = Object.keys(tindaDataMerchant).sort().reduce((obj,key) => {
      obj[key] = tindaDataMerchant[key];
      return obj;
    }, {}),
    sign = sha1(querystring.stringify(ordered, null, null, {
      encodeURIComponent: querystring.unescape}) + appsecret);

  tindaDataMerchant.sign = sign;

  // console.log('data for Tinda: ', tindaDataMerchant);

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

  const MID = getRandID(8),
    existingMerchant = await Merchant.findOne({'MID': MID});

  let Data = {
    opMapId: tindaDataMerchant.opMapId,
    userMobile,
    userPasswd: tindaDataMerchant.userPasswd,
    nickName,
    thirdMapId: tindaDataMerchant.thirdMapId,
    thirdMapName: tindaDataMerchant.thirdMapName,
    merMapId: /*resApiTinda.data.merMapId,*/ 600,
    tin,
    partnerId,
    partner: partnerId,
    botChatId: chatId
  };

  if (existingMerchant == null) {
    Data.MID = MID;
  } else Data.MID = getRandID(8);

  console.log('Data from TG_Bot: ', Data);

  const newMerchant = new Merchant(Data);
  await newMerchant.save();

  res.status(200).send({
    _id: newMerchant._id,
    merMapId: /*resApiTinda.data.merMapId*/ 600
  });
};