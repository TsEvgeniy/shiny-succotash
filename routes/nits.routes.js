const nits = require('../controllers/nits.controller');

module.exports = function(app) {
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept');

    next();
  });

  app.get('/info/subject/by-tin', nits.getInfoSubjectByTin);
  app.get('/info/regions', nits.getInfoRegions);
  app.get('/info/districts-by-region', nits.getInfoDistrictsByRegion);
  app.get('/info/activity-group', nits.getInfoActivityGroup);
  app.get('/info/activity-list', nits.getInfoActivityList);

  app.post('/add-store', nits.postAddStore);
  app.post('/add-terminal', nits.postAddTerminal);
};











