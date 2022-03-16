const querystring = require('querystring');
const sha1 = require('sha1');
const db = require('../../../models');
const {Api} = require('../../../helper/api.helper');
const {authGenerator} = require('../../../middlewares/authGeneratorForNits');
const uploadFile = require('../../../middlewares/upload');
const dotenv = require('dotenv');
const {getRandID} = require('../../../middlewares/tidAndMidGenerator');
const fs = require('fs');

dotenv.config();

const Terminal = db.terminal;
const Store = db.store;
const Merchant = db.merchant;
const FiskalModStorage = db.fiskalModStorage;
const TerminalStorage = db.terminalStorage;
const dirName = process.env.FILES_DIR;
// const baseUrl = process.env.BASE_URL;
const baseUrl = 'http://10.0.40.155:8005/api/sales/support/lite/all-stores/upload/files';

exports.allCashDrawersForBot = async (req, res, next) => {
  try {
    const id = req.params.id,
      terminals = await Terminal.find({merchantId: id})
        .populate('store');

    console.log('TEST TERMINAL: ', terminals);

    let newTerminals = [];

    terminals.forEach(element => {
      if (element.contractFile.name === 'NO_FILE') {
        newTerminals.push({
          id: element._id,
          modelNo: element.modelNo,
          machineNo: element.machineNo,
          fiskalMod: element.fiskalMod,
          shopName: element.store.shopName,
          createdAt: element.createdAt,
          updatedAt: element.updatedAt,
          status: 0
        });
        } else {
        newTerminals.push({
          id: element._id,
          modelNo: element.modelNo,
          machineNo: element.machineNo,
          fiskalMod: element.fiskalMod,
          shopName: element.store.shopName,
          createdAt: element.createdAt,
          updatedAt: element.updatedAt,
          status: 1
        });
      };
    });

    res.status(200).send(newTerminals);
  } catch (error) {
    next(error);
  }
}

exports.addTerminalBot = async (req, res, next) => {
  try {
    const {
      ccmCategoryId,
      shopMapId,
      tin,
      /*officeId,*/ // we have or not
      /*phone,*/ // we have or not
      shopId,
      merchantId,
      typeOfApplication
    } = req.body;

    console.log('merchant id from cashDrawer.bot.controller: ', req.body);

    const testStore = await Store.findOne({_id: shopId});

    const testMerchant = await Merchant.findOne({_id: merchantId});

    const terminalFromStorage = await TerminalStorage.findOne({'statusExisting': 0}),
      fiskalFromStorage = await FiskalModStorage.findOne({'statusExisting': 0});

    if ((terminalFromStorage != null) && (fiskalFromStorage != null)) {
      await TerminalStorage.updateOne({
          '_id':terminalFromStorage._id
        },
        {
          $set: {
            'fiskalMod': fiskalFromStorage._id,
            'statusExisting': 1
          }
        }
      );
      await FiskalModStorage.updateOne({
          '_id': fiskalFromStorage._id
        },
        {
          $set: {
            'terminal': terminalFromStorage._id,
            'statusExisting': 1
          }
        }
      );
      const newTerminal = await TerminalStorage.findOne({'_id': terminalFromStorage._id}),
        newFiskal = await FiskalModStorage.findOne({'_id': fiskalFromStorage._id});

      const TID = getRandID(15);
      const existingTerminal = await Terminal.findOne({'TID':TID});
      let Data = {
          modelNo: ccmCategoryId,
          machineNo:  newTerminal.serialNumber,
          shopMapId,
          officeId: testStore.officeId,
          phone: testMerchant.phone,
          fiskalMod: newFiskal.fiskalMod,
          contractNumber: "DCS-01-4680",    //change for each new contract
          typeOfApplication,
          tin,
          shopId,
          merchantId,
          partnerId: req.userId,
          partner: req.userId,
          store: shopId,
          merchant: merchantId,
          status:"5",
          applicationId:"",
          registrationCardUrl:"",
          contractFile:{
            name: 'NO_FILE',
            source: ''
          },
          applicationFile: {
            name: '',
            source: ''
          }
        };

      if (existingTerminal == null) {
        Data.TID = TID;
      } else Data.TID = getRandID(15);

      const tindaDataTerminal = {
          modelNo:ccmCategoryId,
          machineNo:newTerminal.serialNumber,
          shopMapId,
          opMapId: 10000001,
          time: Math.floor(new Date().getTime() / 1000)
        };

      const appsecret = process.env.APPSECRET,
        ordered = Object.keys(tindaDataTerminal).sort().reduce((obj, key) => {
            obj[key] = tindaDataTerminal[key];
            return obj;
          },
          {}),
        sign = sha1(querystring.stringify(ordered,null,null,{
          encodeURIComponent: querystring.unescape }) + appsecret);

      tindaDataTerminal.sign = sign;

      //TINDA
//******************************************************
//       const resApiTinda = await Api({
//         host: 'http://ds.51zzd.com',
//         url: '/control/api/mer/addByMer',
//         type: 'post',
//         data: tindaDataTerminal
//       });
//
//       console.log('TERMINAL from Tinda: ', resApiTinda);
//******************************************************

      const getApplicationFile = async () => {
        console.log('Inside getApplicationFile');
        const auth = authGenerator(),
          officeId = Data.officeId,
          ccmSerialNumber = Data.machineNo,
          ccmCategoryId = Data.modelNo,
          terminalId = Data.fiskalMod,
          phone = Data.phone

        const { success, data } = await Api({
          host: 'https://api.ofd.uz',
          url: `/ccm-api/info/get-appendix1?officeId=${officeId}&ccmSerialNumber=${ccmSerialNumber}&ccmCategoryId=${ccmCategoryId}&terminalId=${terminalId}&phone=${phone}`,
          auth
      })
        if (success) {
          let fileId = Math.random().toString().slice(2, 22),
            fileName = `${fileId}.pdf`,
            filePath = `${baseUrl}/${fileName}`;
          fs.writeFile(`/Users/eug3ne/Work/arca-final/Arcana_backend/upload/${fileName}`, data.sourceBase64, 'base64', async err => {
            if(err)
              console.log(err)
          });
          return {filePath, fileName};
        } else {
          console.log('no success')
        }
      };

      const fileNameAndFilePath = await getApplicationFile();

      console.log('FILE_PATH: ', fileNameAndFilePath.filePath);

      Data.applicationFile.name = fileNameAndFilePath.fileName;
      Data.applicationFile.source = fileNameAndFilePath.filePath;

      const new_Terminal = new Terminal(Data);

      await new_Terminal.save();

      const test_store = await Store.findById({_id: shopId});
      test_store.terminals.push(newTerminal);

      await test_store.save();

      const test_merchant = await Merchant.findById({_id: merchantId});
      test_merchant.terminals.push(new_Terminal);

      await test_merchant.save();

      res.status(200).send( new_Terminal );

    } else if (terminalFromStorage == null) res.status(200).send({error: 0, message: "There is no free terminals"});
    else res.status(200).send({error:1, message: "There is no free FM"});
  } catch (error) {
    next(error);
  }
};

exports.sendApplicationToNits = async (req, res, next) => {
  try {
    await uploadFile(req, res);

    const {_id} = req.body;

    const testTerm = await Terminal.findOne({_id})
      .populate('merchant')
      .populate('store');

    const nitsData = {
      applicationFile: [
        {
          name: testTerm.applicationFile.name,
          source: testTerm.applicationFile.source
        }
      ],
      ccmCategoryId: testTerm.modelNo,
      ccmSerialNumber: testTerm.machineNo,
      contractFile: [
        {
          name: testTerm.contractFile.name,
          source: testTerm.contractFile.source
        }
      ],
      officeId: testTerm.store.officeId,
      phone: testTerm.merchant.userMobile,
      terminalId:testTerm.fiskalMod,
      tin: testTerm.tin
    };
    //
    console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^', nitsData);

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

    // testTerm.applicationId = resApiNITS.data.id;
    // testTerm.registrationCardUrl = resApiNITS.data.fileUrl;
    testTerm.status = 1;

    console.log("@@@@@@@@TEST_TERM terminal after add info from NITS: ", testTerm);

    const newTestTerm = new Terminal(testTerm);
    await newTestTerm.save();

    const testTerm_store = await Store.findById({_id: testTerm.shopId});
    testTerm_store.terminals.push(newTestTerm);
    await testTerm_store.save();

    const testTerm_merchant = await Merchant.findById({_id: testTerm.merchantId});
    testTerm_merchant.terminals.push(newTestTerm);
    await testTerm_merchant.save();

    res.status(200).send(newTestTerm);

  } catch (error) {
    next(error);
  }
}