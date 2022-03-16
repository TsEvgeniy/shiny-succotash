const db = require('../models');

const Store = db.store;

const storeInitial = () => {
  Store.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Store({}).save(err => {
        if (err) {
          console.log('error', err)
        };

        console.log('Store DB initialized');
      });
    }
  })
}

const stInitial = {
  storeInitial
};

module.exports = stInitial;