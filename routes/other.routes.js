const { authJwt } = require('../middlewares');
const tidAndMidBySerNum = require('../controllers/cashDrawerBySerialNum.controller');
const merchant = require('../controllers/sales/merchant/merchant.bot.controller');
const store = require('../controllers/sales/store/store.bot.controller');
const terminal = require('../controllers/sales/cashDrawer/cashDrawer.bot.controller');
const findAndBindTerminalAndFM = require('../controllers/sales/findAndBindTerminalAndFM.bot.controller');
const others = require('../controllers/sales/checkStatusTinAndChatId.controller');
const agreementDoc = require('../controllers/sales/addAgreementFile.controller');
// const getTerminalInfoFromTelegramBot = require('../controllers/sales/cashDrawer/cashDrawer.bot.controller');
// const allTerminals = require('../controllers/sales/cashDrawer/allCashDrawers.bot.controller');


const SALES_SUPPORT_ROUTE = '/api/sales/support';

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept');

    next();
  });

  app.get('/api/tid-and-mid/:id',
    tidAndMidBySerNum.allTIDandMIDbyCashDrawerSerialNumber);

  //SUPPORT LITE CHECK STATUS TIN AND CHAT_ID
  app.get(`${SALES_SUPPORT_ROUTE}/lite/check-status-tin-and-chat_id`,
    [authJwt.verifyToken, authJwt.isCTOMod], others.checkStatus);

  //SUPPORT LITE MERCHANT BOT
  app.post(`${SALES_SUPPORT_ROUTE}/lite/add-merchant-bot`,
    [authJwt.verifyToken, authJwt.isCTOMod], merchant.addMerchantBot);

  //SUPPORT LITE STORE BOT
  app.post(`${SALES_SUPPORT_ROUTE}/lite/add-store-bot`,
    [authJwt.verifyToken, authJwt.isCTOMod], store.addStoreBot);

  //SUPPORT LITE TERMINAL BOT
  app.post(`${SALES_SUPPORT_ROUTE}/lite/add-terminal-bot`,   /*remove lite from  URL because its BOT*/
    [authJwt.verifyToken, authJwt.isCTOMod], terminal.addTerminalBot);
  app.get(`${SALES_SUPPORT_ROUTE}/lite/all-terminals-bot/:id`,
    [authJwt.verifyToken, authJwt.isCTOMod], terminal.allCashDrawersForBot);

  //SUPPORT LITE TERMINAL RECEIVE INFORMATION
  app.post(`${SALES_SUPPORT_ROUTE}/lite/send-nits-application-from-bot`,
    [authJwt.verifyToken, authJwt.isCTOMod], terminal.sendApplicationToNits);

  app.post(`${SALES_SUPPORT_ROUTE}/lite/add-agreement-doc`,
    [authJwt.verifyToken, authJwt.isCTOMod], agreementDoc.addAgreementDoc);

  // app.get(`${SALES_SUPPORT_ROUTE}/lite/all-terminals`,
  //   [authJwt.verifyToken, authJwt.isCTOMod], allTerminals.allCashDrawers);

  app.get(`${SALES_SUPPORT_ROUTE}/bot/findAndBind`,
    [authJwt.verifyToken, authJwt.isCTOMod], findAndBindTerminalAndFM.findAndBind);  /*ADD role for BOT*/
};