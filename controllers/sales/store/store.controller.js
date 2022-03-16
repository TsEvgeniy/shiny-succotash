const querystring = require('querystring');
const sha1 = require('sha1');
const db = require('../../../models/');
const uploadFile = require('../../../middlewares/upload');
const {Api} = require('../../../helper/api.helper');
const {authGenerator} = require('../../../middlewares/authGeneratorForNits');
const {getCodeRegion, getCodeDistrict} = require('../../../helper/selectDistrictAndRegions');
const dotenv = require('dotenv');

dotenv.config();

const baseUrl = process.env.BASE_URL;
const Store = db.store;
const Merchant = db.merchant;

exports.allStores = async (req, res, next) => {
  try {
    const id = req.params.id,
      stores = await Store.find({merchantId: id})
        .populate('partner');

    let newStores = [];

    stores.forEach(element => {
      newStores.push({
        docCadastre: element.docCadastre,
        nomenclature: element.nomenclature,
        terminals: element.terminals,
        _id: element._id,
        shopName: element.shopName,
        cityCountyId: element.cityCountyId,
        cityAddress: element.cityAddress,
        merMapId: element.merMapId,
        opMapId: element.opMapId,
        activityGroup: element.activityGroup,
        activityGroupName: element.activityGroupName,
        activityType: element.activityType,
        activityTypeName: element.activityTypeName,
        cadastreNumber: element.cadastreNumber,
        districtCode: element.districtCode,
        districtName: element.districtName,
        latitude: element.latitude,
        longitude: element.longitude,
        regionCode: element.regionCode,
        regionName: element.regionName,
        tin: element.tin,
        pinfl: element.pinfl,
        merchantId: element.merchantId,
        merchant: element.merchant,
        partnerId: element.partnerId,
        partnerName: element.partner.username,
        partnerPhone: element.partner.phoneNumber,
        officeId: element.officeId,
        shopMapId: element.shopMapId,
        createdAt: element.createdAt,
        updatedAt: element.updatedAt,
        __v: element.__v
      });
    });

    res.status(200).send(newStores);
  } catch (error) {
    next(error);
  };
};

exports.oneStore = async (req, res, next) => {
  try {
    const store = await Store.findById({_id: req.params.id})
      .populate('merchant');
    res.status(200).send(store);
  } catch (error) {
    next(error);
  };
};

exports.addStore = async (req, res) => {

  await uploadFile(req, res);

  const { shopName, cityCountyId, mccId,
    mccName, cityAddress, merMapId, opMapId,
    activityGroup, activityGroupName, activityType,
    activityTypeName, cadastreNumber, districtCode,
    districtName, latitude, longitude,
    regionCode, regionName, tin, pinfl, merchantId } = req.body,

    tindaDataStore = {
      shopName,
      mccId:2001,
      mccName:"test",
      cityCountyId:getCodeRegion(parseInt(req.body.regionCode)), /**/
      cityAddress,
      merMapId,
      opMapId: 10000001,
      time: Math.floor(new Date().getTime() / 1000)
    },
    appsecret = process.env.APPSECRET,
    ordered = Object.keys(tindaDataStore).sort().reduce((obj, key) => {
      obj[key] = tindaDataStore[key];
      return obj;
    },
    {}),

    sign = sha1(querystring.stringify(ordered,null,null, {
      encodeURIComponent: querystring.unescape }) + appsecret);

  tindaDataStore.sign = sign;

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

  if (!req.files[0]) {
    req.files.push({filename:'NO_FILE'});
  }

  if (!req.files[1]) {
    req.files.push({filename:'NO_FILE'});
  }

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
      pinfl,
    merchantId,
    merchant:merchantId,
    partnerId: req.userId,
    partner: req.userId,
    shopMapId: 500, /*resApiTinda.data.shopMapId,*/ /*500*/
    docCadastre: {
      name: req.files[0].filename,
      source: baseUrl + req.files[0].filename
    },
    nomenclature:{
      name: req.files[1].filename,
      source: baseUrl + req.files[1].filename
    },
  },
    nitsData = {
      activityGroup,
      activityType,
      address: cityAddress,
      districtCode,
      files: [{
        name:req.files[0].filename,
        source:baseUrl + req.files[0].filename
      }],
      latitude,
      longitude,
      name: shopName,
      regionCode,
      tin
    };

  // console.log('STORE_Data for NITS before save: ', nitsData);

  let merchantPhoneNumber = await Merchant.findOne({_id:Data.merchantId});
    // console.log('UserMob_testVar is: ', merchantPhoneNumber.userMobile);

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

  Data.officeId = 777;

  // console.log('STORE_Data for ARCANA before save: ', Data);

  const newStore = new Store(Data);

  await newStore.save();

  console.log('NEW_STORE_Data for ARCANA before save: ', newStore);

  const test_merchant = await Merchant.findById({_id: merchantId});

  test_merchant.stores.push(newStore);

  console.log('AFTER PUSH STORE TO MERCH: ', test_merchant);

  await test_merchant.save();

  const billingData = {
    store_id: newStore._id,
    merchant_id: merchantId,
    shopName,
    cityAddress,
    regionCode,
    regionName,
    districtCode,
    districtName,
    activityGroup,
    activityGroupName,
    activityType,
    activityTypeName,
    cadastreNumber,
    latitude,
    longitude
  };

  console.log('billing_data: ', billingData);

  // BILLING
//*****************************************************************
  const resApiBilling = await Api({
    host: 'http://193.27.207.77:47080',
    url: '/insert/store',
    type: 'post',
    data: billingData,
    auth:"YXJjYTphcmNh"
  })
  console.log('ANSWER FROM BILLING SYSTEM_STORE: ', resApiBilling);
//*****************************************************************

  res.status(200).send({
    _id: newStore._id,
    merchantId: newStore.merchantId,
    officeId:777,
    phone: merchantPhoneNumber.userMobile,
    shopMapId: 123 /*resApiTinda.data.shopMapId*/ /*123   test field*/ //DONT FORGET TO clear test data!
  });
};