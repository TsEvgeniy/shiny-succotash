const querystring = require('querystring');
const sha1 = require('sha1');
const db = require('../../../models');
const { Api } = require('../../../helper/api.helper');
const { authGenerator } = require('../../../middlewares/authGeneratorForNits');
const uploadFile = require('../../../middlewares/upload');
const dotenv = require('dotenv');
const { getRandID } = require('../../../middlewares/tidAndMidGenerator');

dotenv.config();

const Terminal = db.terminal;
const Store = db.store;
const Merchant = db.merchant;

const baseUrl = process.env.BASE_URL;

exports.allCashDrawers = async (req, res, next) => {
  try {
    const id = req.params.id,
      terminals = await Terminal.find({ shopId: id }).populate('partner');

    let newTerminals = [];

    terminals.forEach(element => {
      newTerminals.push({
        applicationFile: element.applicationFile,
        contractFile: element.contractFile,
        formCTO: element.formCTO,
        _id: element._id,
        modelNo: element.modelNo,
        date: element.date,
        machineNo: element.machineNo,
        shopMapId: element.shopMapId,
        phone: element.phone,
        fiskalMod: element.fiskalMod,
        tin: element.tin,
        pinfl: element.pinfl,
        shopId: element.shopId,
        merchantId: element.merchantId,
        partnerId: element.partnerId,
        partnerName: element.partner.username,
        partnerPhone: element.partner.phoneNumber,
        store: element.store,
        merchant: element.merchant,
        status: element.status,
        applicationId: element.applicationId,
        registrationCardUrl: element.registrationCardUrl,
        createdAt: element.createdAt,
        updatedAt: element.updatedAt,
        __v: element.__v,
      });
    });

    res.status(200).send(newTerminals);
  } catch (error) {
    next(error);
  }
};

exports.addCashDrawer = async (req, res) => {
  await uploadFile(req, res);

  const {
      shopMapId,
      ccmCategoryId,
      ccmSerialNumber,
      officeId,
      phone,
      fiskalMod,
      tin,
      pinfl,
      shopId,
      merchantId,
      contractNumber,
      date,
      typeOfApplication,
    } = req.body,
    tindaDataTerminal = {
      modelNo: req.body.ccmCategoryId,
      machineNo: req.body.ccmSerialNumber,
      shopMapId,
      opMapId: 10000001,
      time: Math.floor(new Date().getTime() / 1000),
    },
    appsecret = process.env.APPSECRET,
    ordered = Object.keys(tindaDataTerminal)
      .sort()
      .reduce((obj, key) => {
        obj[key] = tindaDataTerminal[key];
        return obj;
      }, {}),
    sign = sha1(
      querystring.stringify(ordered, null, null, {
        encodeURIComponent: querystring.unescape,
      }) + appsecret
    );

  tindaDataTerminal.sign = sign;

  //TINDA
  //******************************************************
  //   const resApiTinda = await Api({
  //     host: 'http://ds.51zzd.com',
  //     url: '/control/api/mer/addByMer',
  //     type: 'post',
  //     data: tindaDataTerminal
  //   });
  //
  //   console.log('TERMINAL from Tinda: ', resApiTinda);
  //******************************************************

  if (!req.files[0]) {
    req.files.push({ filename: 'NO_FILE' });
  }

  if (!req.files[1]) {
    req.files.push({ filename: 'NO_FILE' });
  }

  if (!req.files[2]) {
    req.files.push({ filename: 'NO_FILE' });
  }

  const TID = getRandID(8),
    existingTerminal = await Terminal.findOne({ TID: TID }),
    Data = {
      modelNo: ccmCategoryId,
      machineNo: ccmSerialNumber,
      shopMapId,
      officeId,
      phone,
      fiskalMod,
      contractNumber,
      date,
      typeOfApplication,
      tin,
      pinfl,
      applicationFile: {
        name: req.files[0].filename,
        source: baseUrl + req.files[0].filename,
      },
      contractFile: {
        name: req.files[1].filename,
        source: baseUrl + req.files[1].filename,
      },
      formCTO: {
        name: req.files[2].filename,
        source: baseUrl + req.files[2].filename,
      },
      shopId,
      merchantId,
      partnerId: req.userId,
      partner: req.userId,
      store: shopId,
      merchant: merchantId,
      status: '1',
      applicationId: '',
      registrationCardUrl: '',
      balance: 0,
    },
    nitsData = {
      applicationFile: [
        {
          name: req.files[0].filename,
          source: baseUrl + req.files[0].filename,
        },
      ],
      ccmCategoryId,
      ccmSerialNumber,
      contractFile: [
        {
          name: req.files[1].filename,
          source: baseUrl + req.files[1].filename,
        },
      ],
      officeId,
      phone,
      terminalId: fiskalMod,
      tin,
    };

  if (existingTerminal == null) {
    Data.TID = TID;
  } else Data.TID = getRandID(15);

  //NITS
  //******************************************************
  //   const resApiNITS = await Api({
  //     host: 'https://api.ofd.uz',
  //     url: '/ccm-api/application/tax/add-json',
  //     auth: authGenerator(),
  //     type:'post',
  //     data: nitsData
  //   })
  //
  //   console.log("TERMINAL answer from NITS", resApiNITS);
  //******************************************************

  // console.log('TERMINAL_Data for arcanaDB is: ', Data);
  // console.log('TERMINAL_Data for nits is: ', nitsData);

  // Data.applicationId = resApiNITS.data.id;
  // Data.registrationCardUrl = resApiNITS.data.fileUrl;

  const newTerminal = new Terminal(Data);
  await newTerminal.save();

  const test_store = await Store.findById({ _id: shopId });
  test_store.terminals.push(newTerminal);
  await test_store.save();

  const test_merchant = await Merchant.findById({ _id: merchantId });
  test_merchant.terminals.push(newTerminal);
  await test_merchant.save();

  const billingData = {
    terminal_id: newTerminal._id,
    store_id: shopId,
    modelNo: ccmCategoryId,
    shopMapId,
    machineNo: ccmSerialNumber,
    fiskalMod,
    contractNumber,
    date,
    typeOfApplication,
  };

  // BILLING
  //*****************************************************************
  const resApiBilling = await Api({
    host: 'http://193.27.207.77:47080',
    url: '/insert/terminal',
    type: 'post',
    data: billingData,
    auth: 'YXJjYTphcmNh',
  });
  console.log('ANSWER FROM BILLING SYSTEM_STORE: ', resApiBilling);
  //*****************************************************************

  res.status(200).send(newTerminal);
};
