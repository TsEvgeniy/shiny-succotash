const { authJwt, verifySignUp } = require('../middlewares');

const hr = require('../controllers/administration/hr/hr.controller');

const edmMail = require('../controllers/administration/edm/mail.controller');
const edmEmail = require('../controllers/administration/edm/e-mail.controller');
const edmForms = require('../controllers/administration/edm/forms.controller');
const toolsCalendar = require('../controllers/administration/tools/calendar.controller');
const toolsContacts = require('../controllers/administration/tools/contacts.controller');

const ADMINISTRATION_ROUTE = '/api/administration';

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  //HR
  app.get(
    `${ADMINISTRATION_ROUTE}/hr`,
    /*[authJwt.verifyToken, authJwt.isHRMod],*/
    hr.allHr
  );
  app.post(
    `${ADMINISTRATION_ROUTE}/hr/add`,
    [
      // authJwt.verifyToken,
      // authJwt.isHRMod,
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
    ],
    hr.addHr
  );
  app.post(
    `${ADMINISTRATION_ROUTE}/hr/update/:id`,
    [authJwt.verifyToken, authJwt.isHRMod],
    hr.updateHr
  );
  app.delete(
    `${ADMINISTRATION_ROUTE}/hr/delete/:id`,
    [authJwt.verifyToken, authJwt.isHRMod],
    hr.deleteHr
  );

  //MAIL
  app.get(
    `${ADMINISTRATION_ROUTE}/edm/mail`,
    [authJwt.verifyToken, authJwt.isEDMMod],
    edmMail.allMail
  );
  app.post(
    `${ADMINISTRATION_ROUTE}/edm/mail/add`,
    [authJwt.verifyToken, authJwt.isEDMMod],
    edmMail.addMail
  );
  app.post(
    `${ADMINISTRATION_ROUTE}/edm/mail/update/:id`,
    [authJwt.verifyToken, authJwt.isEDMMod],
    edmMail.updateMail
  );
  app.delete(
    `${ADMINISTRATION_ROUTE}/edm/mail/delete/:id`,
    [authJwt.verifyToken, authJwt.isEDMMod],
    edmMail.deleteMail
  );

  //EMAIL
  app.get(
    `${ADMINISTRATION_ROUTE}/edm/email`,
    [authJwt.verifyToken, authJwt.isEDMMod],
    edmEmail.allEmail
  );
  app.post(
    `${ADMINISTRATION_ROUTE}/edm/email/add`,
    [authJwt.verifyToken, authJwt.isEDMMod],
    edmEmail.addEmail
  );
  app.post(
    `${ADMINISTRATION_ROUTE}/edm/email/update/:id`,
    [authJwt.verifyToken, authJwt.isEDMMod],
    edmEmail.updateEmail
  );
  app.delete(
    `${ADMINISTRATION_ROUTE}/edm/email/delete/:id`,
    [authJwt.verifyToken, authJwt.isEDMMod],
    edmEmail.deleteEmail
  );

  //FORMS
  app.get(
    `${ADMINISTRATION_ROUTE}/edm/forms`,
    [authJwt.verifyToken, authJwt.isEDMMod],
    edmForms.allForms
  );
  app.post(
    `${ADMINISTRATION_ROUTE}/edm/forms/add`,
    [authJwt.verifyToken, authJwt.isEDMMod],
    edmForms.addForm
  );
  app.post(
    `${ADMINISTRATION_ROUTE}/edm/forms/update/:id`,
    [authJwt.verifyToken, authJwt.isEDMMod],
    edmForms.updateForm
  );
  app.delete(
    `${ADMINISTRATION_ROUTE}/edm/forms/delete/:id`,
    [authJwt.verifyToken, authJwt.isEDMMod],
    edmForms.deleteForm
  );

  //CALENDAR
  app.get(
    `${ADMINISTRATION_ROUTE}/tools/calendar`,
    [authJwt.verifyToken, authJwt.isToolsMod],
    toolsCalendar.allCalendar
  );
  app.post(
    `${ADMINISTRATION_ROUTE}/tools/calendar/add`,
    [authJwt.verifyToken, authJwt.isToolsMod],
    toolsCalendar.addCalendar
  );
  app.post(
    `${ADMINISTRATION_ROUTE}/tools/calendar/update/:id`,
    [authJwt.verifyToken, authJwt.isToolsMod],
    toolsCalendar.updateCalendar
  );
  app.delete(
    `${ADMINISTRATION_ROUTE}/tools/calendar/delete/:id`,
    [authJwt.verifyToken, authJwt.isToolsMod],
    toolsCalendar.deleteCalendar
  );

  //CONTACTS
  app.get(
    `${ADMINISTRATION_ROUTE}/tools/contacts`,
    [authJwt.verifyToken, authJwt.isToolsMod],
    toolsContacts.allContacts
  );
  app.post(
    `${ADMINISTRATION_ROUTE}/tools/contacts/add`,
    [authJwt.verifyToken, authJwt.isToolsMod],
    toolsContacts.addContacts
  );
  app.post(
    `${ADMINISTRATION_ROUTE}/tools/contacts/update/:id`,
    [authJwt.verifyToken, authJwt.isToolsMod],
    toolsContacts.updateContacts
  );
  app.delete(
    `${ADMINISTRATION_ROUTE}/tools/contacts/delete/:id`,
    [authJwt.verifyToken, authJwt.isToolsMod],
    toolsContacts.deleteContacts
  );
};
