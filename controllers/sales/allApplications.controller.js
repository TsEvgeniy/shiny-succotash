const db = require('../../models');
const { Api } = require('../../helper/api.helper');
const { authGenerator } = require('../../middlewares/authGeneratorForNits');
const uploadFile = require('../../middlewares/upload');
const dotenv = require('dotenv');

dotenv.config();

const baseUrl = process.env.BASE_URL;
const Terminal = db.terminal;
const Store = db.store;

exports.allApplications = async (req, res, next) => {
  const orders = await Terminal.find({ status: { $in: [1, 2] } });
  const filter = req.query.status;
  // const total = await Terminal.find({status: filter}).countDocuments();
  const limit = 10;
  const skip = (parseInt(req.query.page) || 0) * limit;

  if (filter === '0') {
    const total = await Terminal.find().countDocuments();
    const test = await Terminal.find({})
      .populate('store')
      .populate('merchant')
      .populate('partner')
      .skip(skip)
      .limit(limit);

    // console.log('!!!!!!!!!!test: ', test)

    let newTest = [];

    test.forEach(element => {
      newTest.push({
        applicationFile: element.applicationFile,
        contractFile: element.contractFile,
        formCTO: element.formCTO,
        _id: element._id,
        modelNo: element.modelNo,
        machineNo: element.machineNo,
        shopMapId: element.shopMapId,
        phone: element.phone,
        fiskalMod: element.fiskalMod,
        contractNumber: element.contractNumber,
        date: element.date,
        typeOfApplication: element.typeOfApplication,
        tin: element.tin,
        shopId: element.shopMapId,
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
        statusDesc: element.statusDesc,
      });
    });

    if (orders) {
      await Promise.all(
        orders.map(async (order, index) => {
          const {
            data: [{ status, answerDescription }],
          } = await Api({
            host: 'https://api.ofd.uz',
            url: `/ccm-api/application/tax/get-list?size=10&id=${order.applicationId}`,

            auth: authGenerator(),
          });
          try {
            const res = await Terminal.updateOne(
              { _id: order._id },
              { $set: { status, statusDesc: answerDescription } }
            );
            // console.log(res,index)
          } catch (e) {
            console.log(e);
          }
        })
      );

      res.status(200).send({
        data: newTest,
        total,
      });
    } else {
      console.log('sorry');
    }
  } else {
    const total = await Terminal.find({ status: filter }).countDocuments();
    const test = await Terminal.find({ status: filter })
      .populate('store')
      .populate('merchant')
      .populate('partner')
      .skip(skip)
      .limit(limit);

    let newTest = [];

    test.forEach(element => {
      newTest.push({
        applicationFile: element.applicationFile,
        contractFile: element.contractFile,
        formCTO: element.formCTO,
        _id: element._id,
        modelNo: element.modelNo,
        machineNo: element.machineNo,
        shopMapId: element.shopMapId,
        phone: element.phone,
        fiskalMod: element.fiskalMod,
        contractNumber: element.contractNumber,
        date: element.date,
        typeOfApplication: element.typeOfApplication,
        tin: element.tin,
        shopId: element.shopMapId,
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
        statusDesc: element.statusDesc,
      });
    });

    if (orders) {
      await Promise.all(
        orders.map(async (order, index) => {
          const {
            data: [{ status, answerDescription }],
          } = await Api({
            host: 'https://api.ofd.uz',
            url: `/ccm-api/application/tax/get-list?size=10&id=${order.applicationId}`,

            auth: authGenerator(),
          });
          try {
            const res = await Terminal.updateOne(
              { _id: order._id },
              { $set: { status, statusDesc: answerDescription } }
            );
            // console.log(res,index)
          } catch (e) {
            console.log(e);
          }
        })
      );

      res.status(200).send({
        data: newTest,
        total,
      });
    } else {
      console.log('sorry');
    }
  }
};

exports.updateApplication = async (req, res, next) => {
  try {
    await uploadFile(req, res);

    let id = req.params.id;

    const {
      shopName,
      cityAddress,
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
      ccmCategoryId,
      ccmSerialNumber,
      fiskalMod,
    } = req.body;

    let DataStore = {
      shopName,
      cityAddress,
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
      /*docCadastre: {
        name: req.files[0].filename,
        source: baseUrl + req.files[0].filename
      },
      nomenclature:{
        name: req.files[1].filename,
        source: baseUrl + req.files[1].filename
      },*/
    };

    let DataTerminal = {
      modelNo: ccmCategoryId,
      machineNo: ccmSerialNumber,
      fiskalMod,
      /*applicationFile:{
        name: req.files[2].filename,
        source: baseUrl + req.files[0].filename
      },
      contractFile:{
        name: req.files[3].filename,
        source: baseUrl + req.files[1].filename
      },
      formCTO:{
        name: req.files[4].filename,
        source: baseUrl + req.files[2].filename
      },*/
    };

    // console.log('MAGICK: ', req.body.binaryArrayForIndicatingFiles);
    // console.log('!REQ FILES IS: ', req.files);

    let realArrayNotString = req.body.binaryArrayForIndicatingFiles.split(',');
    // console.log('*******************', realArrayNotString);

    if (req.files.length != 0) {
      let testVar = 0;
      let j = 0;
      for (let i = 0; i < realArrayNotString.length; i++) {
        if (realArrayNotString[i] != '0') {
          testVar++;
          while (j < testVar) {
            switch (i) {
              case 0 /*console.log('here I and J', i,j);*/:
                DataStore.docCadastre = {
                  name: req.files[j].filename,
                  source: baseUrl + req.files[j].filename,
                };
                break;

              case 1 /*console.log('here I and J', i,j);*/:
                DataStore.nomenclature = {
                  name: req.files[j].filename,
                  source: baseUrl + req.files[j].filename,
                };
                break;

              case 2 /*console.log('here I and J', i,j);*/:
                DataTerminal.contractFile = {
                  name: req.files[j].filename,
                  source: baseUrl + req.files[j].filename,
                };
                break;

              case 3 /*console.log('here I and J', i,j);*/:
                DataTerminal.formCTO = {
                  name: req.files[j].filename,
                  source: baseUrl + req.files[j].filename,
                };
                break;

              case 4 /*console.log('here I and J', i,j);*/:
                DataTerminal.applicationFile = {
                  name: req.files[j].filename,
                  source: baseUrl + req.files[j].filename,
                };
                break;
            }
            j++;
          }
          // switch (i) {
          //   case 0: DataStore.docCadastre = {
          //     name:req.files[i].filename,
          //     source: baseUrl + req.files[i].filename
          //   };
          //   break;
          //
          //   case 1: DataStore.nomenclature = {
          //     name: req.files[i].filename,
          //     source: baseUrl + req.files[i].filename
          //   };
          //   break;
          //
          //   case 2: DataTerminal.applicationFile = {
          //     name: req.files[i].filename,
          //     source: baseUrl + req.files[i].filename
          //   };
          //   break;
          //
          //   case 3: DataTerminal.formCTO = {
          //     name: req.files[i].filename,
          //     source: baseUrl + req.files[i].filename
          //   };
          //   break;
          //
          //   case 4: DataTerminal.contractFile = {
          //     name: req.files[i].filename,
          //     source: baseUrl + req.files[i].filename
          //   };
          //   break;
          // }
        }
      }
      console.log(testVar);
    }

    const resultStore = await Store.findByIdAndUpdate(id, DataStore);
    const resultTerminal = await Terminal.findOneAndUpdate(id, DataTerminal);

    res.status(200).send({ message: 'ok' });
  } catch (error) {
    next(error);
  }
};
//
// export const updateRow = async (req, res, next) => {
//   try {
//     await uploadFile(req, res);
//
//     const newRow = req.body;
//     const result = await CommonBase.findOneAndUpdate({ id: req.params.id }, newRow, { new: true });
//     res.sendStatus(200);
//   } catch (error) {
//     next(error)
//   }
// };

// exports.updateStatusAllApplications = async (req, res, next) => {
//   const orders = await Terminal.find({status: { $in: [1, 2] }})
//   if (orders) {
//     await Promise.all(orders.map( async (order, index) => {
//       const { data: [{status, statusName}] } = await Api({
//         host: 'https://api.ofd.uz',
//         url: `/ccm-api/application/tax/get-list?size=10&id=${order.id}`,
//         auth:authGenerator()
//       })
//       try {
//         const res = await Terminal.updateOne(
//           { "id" : order.id },
//           { $set: { statusName, status } }
//         )
//         console.log(res,index)
//         // res.status(200).json('oke')
//       } catch (e) {
//         console.log(e)
//         // res.status(200).json('noke')
//       }
//       // const res = { ...order }
//       // console.log(statusName,'))))))))))))))))))))))000')
//       // return res
//     }))
//     // console.log(ordersWithUpdatedStatus)
//   } else {
//     console.log('sorry')
//   }
// };

// exports.allApplications = async(req, res, next) => {
//   try {
//     const test = await Terminal.find({})
//       .populate("store").populate("merchant");
//
//     res.status(200).send(test);
//
//   } catch (error) {
//     next(error);
//   };
// };
