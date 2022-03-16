const authJwt = require('./authJwt');
const verifySignUp = require('./verifySignUp');
const initial = require('./intialRoles');
//const merInitial = require('./initialMerchants');
//const stInitial = require('./initialStores');
//const termInitial = require('./initialTerminal');
const usrInitial = require('./initialUser');

module.exports = {
    authJwt,
    verifySignUp,
    initial,
//    merInitial,
//    stInitial,
//    termInitial,
    usrInitial
};