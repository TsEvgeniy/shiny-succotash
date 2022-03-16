const express = require('express'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  dbConfig = require('./config/db.config'),
  helmet = require('helmet'),
  dotenv = require('dotenv'),
  morgan = require('morgan'),
  db = require('./models'),
  {
    initial,
    //merInitial,
    //stInitial,
    //termInitial,
    usrInitial,
  } = require('./middlewares'),
  path = require('path');

dotenv.config();

const app = express();

app.use(
  express.static(path.join(__dirname, './build'))
); /* for integration with frontend */

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(helmet());

//mongodb://${dbConfig.DB_USERNAME}:${dbConfig.PASSWORD}@${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}?authSource=admin&w=1
db.mongoose
  .connect(`mongodb://localhost:27017/testBase?authSource=admin&w=1`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Successfully connect to MongoDB.');
    initial.roleInitial();
    //merInitial.merchantInitial();
    //stInitial.storeInitial();
    //termInitial.terminalInitial();
    usrInitial.userInitial();
  })
  .catch(err => {
    console.error('Connection error', err);
    process.exit();
  });

require('./routes/auth.routes')(app);
require('./routes/assets.routes')(app);
require('./routes/sales.routes')(app);
require('./routes/accounting.routes')(app);
require('./routes/administration.routes')(app);
require('./routes/nits.routes')(app);
require('./routes/other.routes')(app);
// require('./routes/files.routes')(app);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './build/index.html'));
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
