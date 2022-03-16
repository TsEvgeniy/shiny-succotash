const { authJwt } = require('../middlewares');

const roles = require('../controllers/role.controller');

const allTidAndMid = require('../controllers/cashDrawerBySerialNum.controller');

const eBankCurrentAccount = require('../controllers/accounting/e-bank/currentAccount.controller');
const eBankDebit = require('../controllers/accounting/e-bank/debit.controller');
const eBankCredit = require('../controllers/accounting/e-bank/credit.controller');
const eBankForeignCurrencyAccounts = require('../controllers/accounting/e-bank/foreignCurrencyAccounts.controller');

const billingPayment = require('../controllers/accounting/billing/payment.controller');
const billingAccrual = require('../controllers/accounting/billing/accrual.controller');
const billingCustomersRejected = require('../controllers/accounting/billing/customers.rejected.controller');
const billingCustomersDisconnected = require('../controllers/accounting/billing/customers.disconnected.controller');
const billingCustomersConnected = require('../controllers/accounting/billing/customers.connected.controller');
const billingTestImitationPaymentService = require('../controllers/accounting/billing/billing.test.imitation.controller');
const billingGetRequest = require('../controllers/accounting/billing/billing.get.request.controller');

const contractsAdministrative = require('../controllers/accounting/contracts/administrative/administrative.controller');
const contractsInternational = require('../controllers/accounting/contracts/international/international.controller');
const contractsOthers = require('../controllers/accounting/contracts/others.controller');
const contractsSale = require('../controllers/accounting/contracts/sales.controller');

const contractsAdministrativeAdditional = require('../controllers/accounting/contracts/administrative/administrative.additional.controller');
const contractsInternationalAdditional = require('../controllers/accounting/contracts/international/international.additional.controller');

const ACCOUNTING_ROUTE = '/api/accounting';

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );

    next();
  });

  app.get('/all-roles', roles.allRoles);

  // app.get('')

  //TEST BILLING ROUTE FOR IMITATION PAYMENT PROCCESS
  app.post(
    `${ACCOUNTING_ROUTE}/test/payment-for-service`,
    billingTestImitationPaymentService.testPaymentForService
  );

  app.post(
    `${ACCOUNTING_ROUTE}/billing/get-request`,
    billingGetRequest.billingGetRequest
  );

  //CURRENT ACCOUNT
  app.get(
    `${ACCOUNTING_ROUTE}/e-bank/currentAccount`,
    [authJwt.verifyToken, authJwt.isEbankMod],
    eBankCurrentAccount.allCurrentAccounts
  );
  app.post(
    `${ACCOUNTING_ROUTE}/e-bank/currentAccount/add`,
    [authJwt.verifyToken, authJwt.isEbankMod],
    eBankCurrentAccount.addCurrentAccount
  );
  app.post(
    `${ACCOUNTING_ROUTE}/e-bank/currentAccount/update/:id`,
    [authJwt.verifyToken, authJwt.isEbankMod],
    eBankCurrentAccount.updateCurrentAccount
  );
  app.delete(
    `${ACCOUNTING_ROUTE}/e-bank/currentAccount/delete/:id`,
    [authJwt.verifyToken, authJwt.isEbankMod],
    eBankCurrentAccount.deleteCurrentAccount
  );

  //DEBIT
  app.get(
    `${ACCOUNTING_ROUTE}/e-bank/debit`,
    [authJwt.verifyToken, authJwt.isEbankMod],
    eBankDebit.allDebit
  );
  app.post(
    `${ACCOUNTING_ROUTE}/e-bank/debit/add`,
    [authJwt.verifyToken, authJwt.isEbankMod],
    eBankDebit.addDebit
  );
  app.post(
    `${ACCOUNTING_ROUTE}/e-bank/debit/update/:id`,
    [authJwt.verifyToken, authJwt.isEbankMod],
    eBankDebit.updateDebit
  );
  app.delete(
    `${ACCOUNTING_ROUTE}/e-bank/debit/delete/:id`,
    [authJwt.verifyToken, authJwt.isEbankMod],
    eBankDebit.deleteDebit
  );

  //CREDIT
  app.get(
    `${ACCOUNTING_ROUTE}/e-bank/credit`,
    [authJwt.verifyToken, authJwt.isEbankMod],
    eBankCredit.allCredit
  );
  app.post(
    `${ACCOUNTING_ROUTE}/e-bank/credit/add`,
    [authJwt.verifyToken, authJwt.isEbankMod],
    eBankCredit.addCredit
  );
  app.post(
    `${ACCOUNTING_ROUTE}/e-bank/credit/update/:id`,
    [authJwt.verifyToken, authJwt.isEbankMod],
    eBankCredit.updateCredit
  );
  app.delete(
    `${ACCOUNTING_ROUTE}/e-bank/credit/delete/:id`,
    [authJwt.verifyToken, authJwt.isEbankMod],
    eBankCredit.deleteCredit
  );

  //FOREIGN CURRENCY ACCOUNTS
  app.get(
    `${ACCOUNTING_ROUTE}/e-bank/foreignCurrencyAccounts`,
    [authJwt.verifyToken, authJwt.isEbankMod],
    eBankForeignCurrencyAccounts.allEbankCurrentAccount
  );
  app.post(
    `${ACCOUNTING_ROUTE}/e-bank/foreignCurrencyAccounts/add`,
    [authJwt.verifyToken, authJwt.isEbankMod],
    eBankForeignCurrencyAccounts.addEbankCurrentAccount
  );
  app.post(
    `${ACCOUNTING_ROUTE}/e-bank/foreignCurrencyAccounts/update/:id`,
    [authJwt.verifyToken, authJwt.isEbankMod],
    eBankForeignCurrencyAccounts.updateEbankCurrentAccount
  );
  app.delete(
    `${ACCOUNTING_ROUTE}/e-bank/foreignCurrencyAccounts/delete/:id`,
    [authJwt.verifyToken, authJwt.isEbankMod],
    eBankForeignCurrencyAccounts.deleteEbankCurrentAccount
  );

  //PAYMENT
  app.get(
    `${ACCOUNTING_ROUTE}/billing/payment`,
    [authJwt.verifyToken, authJwt.isBillingMod],
    billingPayment.allPayments
  );
  app.post(
    `${ACCOUNTING_ROUTE}/billing/payment/add`,
    [authJwt.verifyToken, authJwt.isBillingMod],
    billingPayment.addPayment
  );
  app.post(
    `${ACCOUNTING_ROUTE}/billing/payment/update/:id`,
    [authJwt.verifyToken, authJwt.isBillingMod],
    billingPayment.updatePayment
  );
  app.delete(
    `${ACCOUNTING_ROUTE}/billing/payment/delete/:id`,
    [authJwt.verifyToken, authJwt.isBillingMod],
    billingPayment.deletePayment
  );

  //ACCRUAL
  app.get(
    `${ACCOUNTING_ROUTE}/billing/accrual`,
    [authJwt.verifyToken, authJwt.isBillingMod],
    billingAccrual.allAccrual
  );
  app.post(
    `${ACCOUNTING_ROUTE}/billing/accrual/add`,
    [authJwt.verifyToken, authJwt.isBillingMod],
    billingAccrual.addAccrual
  );
  app.post(
    `${ACCOUNTING_ROUTE}/billing/accrual/update/:id`,
    [authJwt.verifyToken, authJwt.isBillingMod],
    billingAccrual.updateAccrual
  );
  app.delete(
    `${ACCOUNTING_ROUTE}/billing/accrual/delete/:id`,
    [authJwt.verifyToken, authJwt.isBillingMod],
    billingAccrual.deleteAccrual
  );

  //REJECTED
  app.get(
    `${ACCOUNTING_ROUTE}/billing/customers/rejected`,
    [authJwt.verifyToken, authJwt.isBillingMod],
    billingCustomersRejected.allRejected
  );
  app.post(
    `${ACCOUNTING_ROUTE}/billing/customers/rejected/add`,
    [authJwt.verifyToken, authJwt.isBillingMod],
    billingCustomersRejected.addRejected
  );
  app.post(
    `${ACCOUNTING_ROUTE}/billing/customers/rejected/update/:id`,
    [authJwt.verifyToken, authJwt.isBillingMod],
    billingCustomersRejected.updateRejected
  );
  app.delete(
    `${ACCOUNTING_ROUTE}/billing/customers/rejected/delete/:id`,
    [authJwt.verifyToken, authJwt.isBillingMod],
    billingCustomersRejected.deleteRejected
  );

  //DISCONNECTED
  app.get(
    `${ACCOUNTING_ROUTE}/billing/customers/disconnected`,
    [authJwt.verifyToken, authJwt.isBillingMod],
    billingCustomersDisconnected.allDisconnected
  );
  app.post(
    `${ACCOUNTING_ROUTE}/billing/customers/disconnected/add`,
    [authJwt.verifyToken, authJwt.isBillingMod],
    billingCustomersDisconnected.addDisconnected
  );
  app.post(
    `${ACCOUNTING_ROUTE}/billing/customers/disconnect/update/:id`,
    [authJwt.verifyToken, authJwt.isBillingMod],
    billingCustomersDisconnected.updateDisconnected
  );
  app.delete(
    `${ACCOUNTING_ROUTE}/billing/customers/disconnect/delete/:id`,
    [authJwt.verifyToken, authJwt.isBillingMod],
    billingCustomersDisconnected.deleteDisconnected
  );

  //CONNECTED
  app.get(
    `${ACCOUNTING_ROUTE}/billing/customers/connected`,
    [authJwt.verifyToken, authJwt.isBillingMod],
    billingCustomersConnected.allConnected
  );
  app.post(
    `${ACCOUNTING_ROUTE}/billing/customers/connected/add`,
    [authJwt.verifyToken, authJwt.isBillingMod],
    billingCustomersConnected.addConnected
  );
  app.post(
    `${ACCOUNTING_ROUTE}/billing/customers/update/:id`,
    [authJwt.verifyToken, authJwt.isBillingMod],
    billingCustomersConnected.updateConnected
  );
  app.delete(
    `${ACCOUNTING_ROUTE}/billing/customers/delete/:id`,
    [authJwt.verifyToken, authJwt.isBillingMod],
    billingCustomersConnected.deleteConnected
  );

  //ADMINISTRATIVE
  app.get(
    `${ACCOUNTING_ROUTE}/contracts/administrative`,
    [authJwt.verifyToken, authJwt.isContractsMod],
    contractsAdministrative.allAdministrative
  );
  app.post(
    `${ACCOUNTING_ROUTE}/contracts/administrative/add`,
    [authJwt.verifyToken, authJwt.isContractsMod],
    contractsAdministrative.addAdministrative
  );

  //ADMINISTRATIVE ADDITIONAL
  app.get(
    `${ACCOUNTING_ROUTE}/contracts/administrative-additional/:id`,
    [authJwt.verifyToken, authJwt.isContractsMod],
    contractsAdministrativeAdditional.allAdministrativeAdditional
  );
  app.post(
    `${ACCOUNTING_ROUTE}/contracts/administrative-additional/add`,
    [authJwt.verifyToken, authJwt.isContractsMod],
    contractsAdministrativeAdditional.addAdministrativeAdditional
  );

  //INTERNATIONAL
  app.get(
    `${ACCOUNTING_ROUTE}/contracts/international`,
    [authJwt.verifyToken, authJwt.isContractsMod],
    contractsInternational.allInternational
  );
  app.post(
    `${ACCOUNTING_ROUTE}/contracts/international/add`,
    [authJwt.verifyToken, authJwt.isContractsMod],
    contractsInternational.addInternational
  );

  //INTERNATIONAL ADDITIONAL
  app.get(
    `${ACCOUNTING_ROUTE}/contracts/international-additional/:id`,
    [authJwt.verifyToken, authJwt.isContractsMod],
    contractsInternationalAdditional.allInternationalAdditional
  );
  app.post(
    `${ACCOUNTING_ROUTE}/contracts/international-additional/add`,
    [authJwt.verifyToken, authJwt.isContractsMod],
    contractsInternationalAdditional.addInternationalAdditional
  );

  app.post(
    `${ACCOUNTING_ROUTE}/contracts/administrative/update/:id`,
    [authJwt.verifyToken, authJwt.isContractsMod],
    contractsAdministrative.updateAdministrative
  );
  app.delete(
    `${ACCOUNTING_ROUTE}/contracts/administrative/delete/:id`,
    [authJwt.verifyToken, authJwt.isContractsMod],
    contractsAdministrative.deleteAdministrative
  );

  app.post(
    `${ACCOUNTING_ROUTE}/contracts/international/update/:id`,
    [authJwt.verifyToken, authJwt.isContractsMod],
    contractsInternational.updateInternational
  );
  app.delete(
    `${ACCOUNTING_ROUTE}/contracts/international/delete/:id`,
    [authJwt.verifyToken, authJwt.isContractsMod],
    contractsInternational.deleteInternational
  );

  //OTHERS
  app.get(
    `${ACCOUNTING_ROUTE}/contracts/others`,
    [authJwt.verifyToken, authJwt.isContractsMod],
    contractsOthers.allOthers
  );
  app.post(
    `${ACCOUNTING_ROUTE}/contracts/others/add`,
    [authJwt.verifyToken, authJwt.isContractsMod],
    contractsOthers.addOthers
  );
  app.post(
    `${ACCOUNTING_ROUTE}/contracts/others/update/:id`,
    [authJwt.verifyToken, authJwt.isContractsMod],
    contractsOthers.updateOthers
  );
  app.delete(
    `${ACCOUNTING_ROUTE}/contracts/others/delete/:id`,
    [authJwt.verifyToken, authJwt.isContractsMod],
    contractsOthers.deleteOthers
  );

  //SALES
  app.get(
    `${ACCOUNTING_ROUTE}/contracts/sales`,
    [authJwt.verifyToken, authJwt.isContractsMod],
    contractsSale.allSales
  );
  app.post(
    `${ACCOUNTING_ROUTE}/contracts/sales/add`,
    [authJwt.verifyToken, authJwt.isContractsMod],
    contractsSale.addSales
  );
  app.post(
    `${ACCOUNTING_ROUTE}/contracts/sales/update/:id`,
    [authJwt.verifyToken, authJwt.isContractsMod],
    contractsSale.updateSales
  );
  app.delete(
    `${ACCOUNTING_ROUTE}/contracts/sales/delete/:id`,
    [authJwt.verifyToken, authJwt.isContractsMod],
    contractsSale.deleteSales
  );
};
