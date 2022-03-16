const querystring = require('querystring');
const sha1 = require('sha1');
const db = require('../../../models');
const {Api} = require('../../../helper/api.helper');
const {authGenerator} = require('../../../middlewares/authGeneratorForNits');
const {getCodeRegion, getCodeDistrict} = require('../../../helper/selectDistrictAndRegions');
const dotenv = require('dotenv');
const fs = require('fs');
const https = require('https');

dotenv.config();

// const baseUrl = process.env.BASE_URL;
const baseUrl = 'http://10.0.40.155:8005/api/sales/support/lite/all-stores/upload/files/';
const Store = db.store;
const Merchant = db.merchant;


exports.addStoreBot = async (req, res, next) =>
{
  const {
    shopName,
    cityCountyId,
    cityAddress,
    merMapId,
    opMapId,
    activityGroup,
    activityGroupName,
    activityType,
    activityTypeName,
    cadastreNumber,
    districtCode,
    districtName,
    latitude,
    longitude,
    regionCode,
    regionName,
    tin,
    merchantId,
  } = req.body,
    tindaDataStore =
      {
        shopName,
        mccId: 2001,
        mccName: 'test',
        cityCountyId: getCodeRegion(parseInt(req.body.regionCode)),
        cityAddress,
        merMapId,
        opMapId: 10000001,
        time: Math.floor(new Date().getTime() / 1000)
      },
    appsecret = process.env.APPSECRET,
    ordered = Object.keys(tindaDataStore).sort().reduce((obj, key) =>
    {
      obj[key] = tindaDataStore[key];
      return obj;
    }, {}),
    sign = sha1(querystring.stringify(ordered, null, null,
      {
        encodeURIComponent: querystring.unescape
      }) + appsecret);

  tindaDataStore.sign = sign;

  // console.log("from store bot controller req.body: ", req.body);

  const exactFileName = new URL(req.body.fileName).pathname,
    newFileName = exactFileName.split('/'),
    fileCad = newFileName[4];
    console.log('*** from store.bot.controller: ', fileCad);
    const file = await fs.createWriteStream(`upload/${fileCad}`),
    request = https.get(req.body.fileName, async function(response) {
      const res = await response.pipe(file);
    // console.log(res)
  });

  // TINDA
//******************************************************
//   const resApiTinda = await Api({
//     host: 'http://ds.51zzd.com',
//     url: '/control/api/mer/addShop',
//     type: 'post',
//     data: tindaDataStore
//   });
//
//   console.log('STORE from Tinda: ', resApiTinda);
//******************************************************

  const Data = {
    shopName,
    cityCountyId,
    cityAddress,
    merMapId,
    opMapId,
    activityGroup,
    activityGroupName,
    activityType,
    activityTypeName,
    cadastreNumber,
    districtCode,
    districtName,
    latitude,
    longitude,
    regionCode,
    regionName,
    tin,
    merchantId,
    merchant: merchantId,
    partnerId: req.userId,
    partner: req.userId,
    shopMapId: 123, /*resApiTinda.data.shopMapId,*/
    docCadastre: {
      name: fileCad,
      source: baseUrl + fileCad
    },
  };

  const nitsData = {
    activityGroup,
    activityType,
    address: cityAddress,
    districtCode,
    files:[{
      name: fileCad,
      source: baseUrl + fileCad
    }],
    latitude,
    longitude,
    name: shopName,
    regionCode,
    tin
  };

  console.log('STORE_Data for NITS before save: ', nitsData);
  console.log('Data from TG_Bot: ', Data);

  let merchantPhoneNumber = await Merchant.findOne({ _id: Data.merchantId });

  //NITS
//******************************************************
//   const resApiNITS = await Api({
//     host: 'https://api.ofd.uz',
//     url: '/ccm-api/office/add',
//     auth: authGenerator(),
//     type:'post',
//     data: nitsData
//   });
//
//   console.log("STORE answer from NITS", resApiNITS);
//   // console.log("id from NITS", resApiNITS.data.id);
//******************************************************

  // const officeId = resApiNITS.data.id;
  // Data.officeId = officeId;


  Data.officeId = "235719"; /**/

  const newStore = new Store(Data);
  await newStore.save();

  const test_merchant = await Merchant.findById({ _id: merchantId });
  test_merchant.stores.push(newStore);
  await test_merchant.save();

  res.status(200).send({
    _id: newStore._id,
    merchantId: newStore.merchantId,
    officeId,
    phone: merchantPhoneNumber.userMobile,
    shopMapId: 123 /*resApiTinda.data.shopMapId*/   /*123  test data*/ //DONT FORGET TO CHANGE
  });
};