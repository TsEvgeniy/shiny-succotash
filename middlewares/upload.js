const util = require('util');
const multer = require('multer');

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './upload');
  },
  filename: (req, file, cb) => {
    cb(null, `${new Date().getTime()}_${file.originalname}`);
  },
});

let uploadFiles = multer({storage: storage}).array('multi-files', 20);
let uploadFileMiddleware = util.promisify(uploadFiles);

module.exports = uploadFileMiddleware;




