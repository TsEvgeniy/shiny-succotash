const db = require('../../../models');
const bcrypt = require('bcryptjs');

const User = db.user;
const Role = db.role;

exports.allHr = async (req, res, next) => {
    try {
        const users = await User.find({})
          .populate('roles');
        res.status(200).send(users);
    } catch (error) {
        next(error);
    };
};

exports.addHr = async (req, res) => {
    const { username,
            surName,
            middleName,
            series,
            passportNumber,
            givenPlace,
            givenDate,
            birthDate,
            birthPlace,
            inhabitationPlace,
            education,
            // seriesOfDiploma,
            levelOfEducation,
            numberOfDiploma,
            tin,
            pinfl,
            cardNumber,
            corpTelNumber,
            social,
            telegramId,
            gmail,
            zoomId,
            weChatId,
            email,
            department,
            phoneNumber,
            position } = req.body,
      password = bcrypt.hashSync(req.body.password, 10),
      newUser = new User({ username,
          surName,
          middleName,
          series,
          passportNumber,
          givenPlace,
          givenDate,
          birthDate,
          birthPlace,
          inhabitationPlace,
          education,
          // seriesOfDiploma,
          levelOfEducation, numberOfDiploma,
          tin,
          pinfl,
          cardNumber,
          corpTelNumber,
          social,
          telegramId,
          gmail,
          zoomId, weChatId,
          email,
          password,
          department,
          phoneNumber,
          position});

    await newUser.save((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (req.body.roles) {
            Role.find(
              {
                  name: { $in: req.body.roles }
              },
              (err, roles) => {
                  if (err) {
                      res.status(500).send({ message: err });
                      return;
                  }

                  user.roles = roles.map(role => role._id);
                  user.save(err => {
                      if (err) {
                          res.status(500).send({ message: err });
                          return;
                      }

                      res.send({ message: 'User was registered successfully!' });
                  });
              }
            );
        } else {
            Role.findOne({ name: 'user' }, (err, role) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

                user.roles = [role._id];
                user.save(err => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }

                    res.send({ message: 'User was registered successfully!' });
                });
            });
        }
    });
};

exports.updateHr = (req, res, next) => {
    res.status(200).send('Update HR');
};

exports.deleteHr = async (req, res, next) => {
    // await User.deleteOne({_id: req.params.id});
    res.status(200).send({message: 'no delete function!'});
};