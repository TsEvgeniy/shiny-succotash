const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  DB_USERNAME: process.env.DB_USERNAME,
  PASSWORD: process.env.PASSWORD,
  HOST: process.env.HOST,
  PORT: process.env.DB_PORT,
  DB: process.env.DB,
};

// module.exports = {
//     HOST: '10.0.2.109',
//     PORT: 27017,
//     DB: 'server_side_data'
// };
