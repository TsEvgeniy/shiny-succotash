const db = require('../models');

const Role = db.role;

exports.allRoles = async (req, res, next) => {
  try {
    const roles = await Role.find({});
    res.status(200).send(roles);
  } catch (error) {
    next(error);
  };
};