const db = require('../models');

const Merchant = db.merchant;

const merchantInitial = () => {
  Merchant.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Merchant({}).save(err => {
        if (err) {
          console.log('error', err)
        };

        console.log('Merchant DB initialized');
      });
    }
  })
}

const merInitial = {
  merchantInitial
};

module.exports = merInitial;