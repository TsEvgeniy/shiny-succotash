const db = require('../models');

const User = db.user;

const userInitial = () => {
  User.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new User({
        // username:"ONE",
        // password:"1",
        // email:"ONE",
        // department:"neq",
        // phoneNumber:989899,
        // position:"Директор",
        // roles:["hr_mod"]
      }).save(err => {
        if (err) {
          console.log('error', err);
        };

        console.log('User in DB initialized!');
      });
    }
  })
}

const usrInitial = {
  userInitial
};

module.exports = usrInitial;