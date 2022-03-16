const { Api } = require('../../helper/api.helper');
const { authGenerator } = require('../../middlewares/authGeneratorForNits');
const db = require('../../models');

const Merchant = db.merchant;

exports.checkStatus = async(req, res, next) => {
  try {
    const { tin, chatId } = req.query,
      information = await Merchant.findOne({$and: [{'tin': tin}, {'botChatId':chatId}]}),
      newTin = await Merchant.findOne({'tin':tin});

    console.log('***INFORMATION_newTin: ', newTin);

    if (information !== null) {
      res.status(200).send({
        _id: information._id,
        tin: information.tin,
        merchantId: information.merchantId,
        merMapId: information.merMapId
      });
    } else if (newTin === null) {
      const auth = authGenerator(),
        info = await Api({
          host: 'https://api.ofd.uz',
          url: `/ccm-api/info/subject/by-tin?tin=${tin}&lang=uz`,
          auth
        }),
        balance = await Api({
          host: 'https://api.ofd.uz',
          url: `/ccm-api/info/balance/by-tin?tin=${tin}`,
          auth
        });
      res.send({...info.data, ...balance.data});
    } else {
      newTin.botChatId = chatId;
      const updatedMerchant = new Merchant(newTin);
      await updatedMerchant.save();

      res.status(200).send({
        _id: newTin._id,
        tin: newTin.tin,
        merMapId: newTin.merMapId
      })
    }

    // if (newTin === null) {
    //   console.log('here!');
    //   const auth = authGenerator(),
    //     info = await Api({
    //       host: 'https://api.ofd.uz',
    //       url: `/ccm-api/info/subject/by-tin?tin=${tin}&lang=uz`,
    //       auth
    //     }),
    //     balance = await Api({
    //       host: 'https://api.ofd.uz',
    //       url: `/ccm-api/info/balance/by-tin?tin=${tin}`,
    //       auth
    //     });
    //   res.send({...info.data, ...balance.data});
    // } else {
    //   newTin.botChatId = chatId;
    //   const updatedMerchant = new Merchant(newTin);
    //   await updatedMerchant.save();
    //
    //   res.status(200).send({
    //     _id: newTin._id
    //   })
    // };

    console.log('information is: ', information);

    // res.status(200).send({
    //   _id:information._id
    // });
  } catch (error) {
    next(error);
  }
};