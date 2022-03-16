// const fileController = require('../controllers/files.controller');
//
// module.exports = function (app) {
//   app.use(function (req, res, next) {
//     res.header('Access-Control-Allow-Headers',
//       'x-access-token, Origin, Content-Type, Accept');
//
//     next();
//   });
//
//   app.post('/upload', fileController.upload);
//   app.get('/files', fileController.getListFiles);
//   app.get('/files/:name', fileController.download);
// };