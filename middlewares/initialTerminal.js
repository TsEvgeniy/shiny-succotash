const db = require('../models');

const Terminal = db.terminal

const terminalInitial = () => {
  Terminal.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Terminal({}).save(err => {
        if (err) {
          console.log('error', err)
        };

        console.log('Terminal DB initialized');
      });
    }
  })
}

const termInitial = {
  terminalInitial
};

module.exports = termInitial;