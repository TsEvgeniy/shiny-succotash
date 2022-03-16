const { authJwt } = require('../middlewares');
const supportLite = require('../controllers/sales/supportLite.controller');
const supportPro = require('../controllers/sales/supportPro.controller');
const supportRepair = require('../controllers/sales/supportRepair.controller');
const merchant = require('../controllers/sales/merchant/merchant.controller');
const store = require('../controllers/sales/store/store.controller');
const allApplications = require('../controllers/sales/allApplications.controller');
const cashDrawer = require('../controllers/sales/cashDrawer/cashDrawer.controller');

const filesContr = require('../controllers/files.controller');

const SALES_SUPPORT_ROUTE = '/api/sales/support';

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            'Access-Control-Allow-Headers',
            'x-access-token, Origin, Content-Type, Accept'
        );
        next();
    });

    //SUPPORT LITE
    app.get(`${SALES_SUPPORT_ROUTE}/lite`,
        [authJwt.verifyToken, authJwt.isSupportLiteMod], supportLite.allSupportLite);
    app.post(`${SALES_SUPPORT_ROUTE}/lite/add`,
        [authJwt.verifyToken, authJwt.isSupportLiteMod], supportLite.addSupportLite);
    app.post(`${SALES_SUPPORT_ROUTE}/lite/update/:id`,
        [authJwt.verifyToken, authJwt.isSupportLiteMod], supportLite.updateSupportLite);
    app.delete(`${SALES_SUPPORT_ROUTE}/lite/delete/:id`,
        [authJwt.verifyToken, authJwt.isSupportLiteMod], supportLite.deleteSupportLite);

    //SUPPORT LITE MERCHANT
    app.get(`${SALES_SUPPORT_ROUTE}/lite/merchants`,
      [authJwt.verifyToken, authJwt.isCTOMod], merchant.allMerchants);
    app.post(`${SALES_SUPPORT_ROUTE}/lite/add-merchant`,
      [authJwt.verifyToken, authJwt.isCTOMod], merchant.addMerchant);

    //SUPPORT LITE STORE
    app.post(`${SALES_SUPPORT_ROUTE}/lite/add-store`,
      [authJwt.verifyToken, authJwt.isCTOMod], store.addStore);
    app.get(`${SALES_SUPPORT_ROUTE}/lite/all-stores/:id`,
      [authJwt.verifyToken, authJwt.isCTOMod], store.allStores);
    app.get(`${SALES_SUPPORT_ROUTE}/lite/one-store/:id`,
      [authJwt.verifyToken, authJwt.isCTOMod], store.oneStore);
    app.get(`${SALES_SUPPORT_ROUTE}/lite/all-stores/upload/files/:name`, filesContr.download);

    //SUPPORT LITE TERMINAL
    app.post(`${SALES_SUPPORT_ROUTE}/lite/add-cash-drawer`,
      [authJwt.verifyToken, authJwt.isCTOMod], cashDrawer.addCashDrawer);
    app.get(`${SALES_SUPPORT_ROUTE}/lite/all-cash-drawers/:id`,
      [authJwt.verifyToken, authJwt.isCTOMod], cashDrawer.allCashDrawers);

    //SUPPORT LITE ALL APPLICATIONS
    app.get(`${SALES_SUPPORT_ROUTE}/lite/all-applications`,
      [authJwt.verifyToken, authJwt.isCTOMod], allApplications.allApplications);
    app.post(`${SALES_SUPPORT_ROUTE}/lite/update/application/:id`,
      [authJwt.verifyToken, authJwt.isCTOMod], allApplications.updateApplication);

    //SUPPORT PRO

    //SUPPORT PRO BLOCK_UNBLOCK_RESTART TERMINAL
    app.post(`${SALES_SUPPORT_ROUTE}/pro/block-unblock-restart-terminal`,
      [authJwt.verifyToken, authJwt.isSupportProMod], supportPro.blockUnblockRestartTerminal);

    //SUPPORT PRO SEARCH TERMINAL
    app.get(`${SALES_SUPPORT_ROUTE}/pro/search-terminal`,
      [authJwt.verifyToken, authJwt.isSupportProMod], supportPro.searchTerminal)

    app.get(`${SALES_SUPPORT_ROUTE}/pro`,
      [authJwt.verifyToken, authJwt.isSupportProMod], supportPro.allSupportPro);
    app.post(`${SALES_SUPPORT_ROUTE}/pro/add`,
      [authJwt.verifyToken, authJwt.isSupportProMod], supportPro.addSupportPro);
    app.post(`${SALES_SUPPORT_ROUTE}/pro/update/:id`,
        [authJwt.verifyToken, authJwt.isSupportProMod], supportPro.updateSupportPro);
    app.delete(`${SALES_SUPPORT_ROUTE}/pro/delete/:id`,
        [authJwt.verifyToken, authJwt.isSupportProMod], supportPro.deleteSupportPro);

    //SUPPORT REPAIR
    app.get(`${SALES_SUPPORT_ROUTE}/repair`,
        [authJwt.verifyToken, authJwt.isSupportRepairMod], supportRepair.allSupportRepair);
    app.post(`${SALES_SUPPORT_ROUTE}/repair/add`,
        [authJwt.verifyToken, authJwt.isSupportRepairMod], supportRepair.addSupportRepair);
    app.post(`${SALES_SUPPORT_ROUTE}/repair/update/:id`,
        [authJwt.verifyToken, authJwt.isSupportRepairMod], supportRepair.updateSupportRepair);
    app.delete(`${SALES_SUPPORT_ROUTE}/repair/delete/:id`,
        [authJwt.verifyToken, authJwt.isSupportRepairMod], supportRepair.deleteSupportRepair);
};