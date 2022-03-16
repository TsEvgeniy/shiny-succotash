const jwt = require('jsonwebtoken');
const config = require('../config/auth.config.js');
const db = require('../models');
const User = db.user;
const Role = db.role;

verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token'];

    if (!token) {
        return res.status(403).send({ message: 'No token provided!' });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: 'Unauthorized!' });
        }
        req.userId = decoded.id;
        next();
    });
};

isHRMod = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        Role.find(
            {
                _id: { $in: user.roles }
            },
            (err, roles) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

                for (let i = 0; i < roles.length; i++) {
                    if (roles[i].name === 'hr_mod') {
                        next();
                        return;
                    }
                }

                res.status(403).send({ message: 'Require HRMod Role!' });
                return;
            }
        );
    });
};

isEDMMod = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        Role.find(
            {
                _id: { $in: user.roles }
            },
            (err, roles) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

                for (let i = 0; i < roles.length; i++) {
                    if (roles[i].name === 'edm_mod') {
                        next();
                        return;
                    }
                }

                res.status(403).send({ message: 'Require EDMMod Role!' });
                return;
            }
        );
    });
};

isToolsMod = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        Role.find(
            {
                _id: { $in: user.roles }
            },
            (err, roles) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

                for (let i = 0; i < roles.length; i++) {
                    if (roles[i].name === 'tools_mod') {
                        next();
                        return;
                    }
                }

                res.status(403).send({ message: 'Require ToolsMod Role!' });
                return;
            }
        );
    });
};

isObjectMod = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        Role.find(
            {
                _id: { $in: user.roles }
            },
            (err, roles) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

                for (let i = 0; i < roles.length; i++) {
                    if (roles[i].name === 'object_mod') {
                        next();
                        return;
                    }
                }

                res.status(403).send({ message: 'Require ObjectMod Role!' });
                return;
            }
        );
    });
};

isAssemblyMod = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        Role.find(
            {
                _id: { $in: user.roles }
            },
            (err, roles) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

                for (let i = 0; i < roles.length; i++) {
                    if (roles[i].name === 'assembly_mod') {
                        next();
                        return;
                    }
                }

                res.status(403).send({ message: 'Require AssemblyMod Role!' });
                return;
            }
        );
    });
};

isBillingMod = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        Role.find(
            {
                _id: { $in: user.roles }
            },
            (err, roles) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

                for (let i = 0; i < roles.length; i++) {
                    if (roles[i].name === 'billing_mod') {
                        next();
                        return;
                    }
                }

                res.status(403).send({ message: 'Require BillingMod Role!' });
                return;
            }
        );
    });
};

isContractsMod = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        Role.find(
            {
                _id: { $in: user.roles }
            },
            (err, roles) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

                for (let i = 0; i < roles.length; i++) {
                    if (roles[i].name === 'contracts_mod') {
                        next();
                        return;
                    }
                }

                res.status(403).send({ message: 'Require ContractsMod Role!' });
                return;
            }
        );
    });
};

isSupportLiteMod = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        Role.find(
            {
                _id: { $in: user.roles }
            },
            (err, roles) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

                for (let i = 0; i < roles.length; i++) {
                    if (roles[i].name === 'support_lite_mod') {
                        next();
                        return;
                    }
                }

                res.status(403).send({ message: 'Require SupportLiteMod Role!' });
                return;
            }
        );
    });
};

isSupportProMod = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        Role.find(
            {
                _id: { $in: user.roles }
            },
            (err, roles) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

                for (let i = 0; i < roles.length; i++) {
                    if (roles[i].name === 'support_pro_mod') {
                        next();
                        return;
                    }
                }

                res.status(403).send({ message: 'Require SupportProMod Role!' });
                return;
            }
        );
    });
};

isSupportRepairMod = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        Role.find(
            {
                _id: { $in: user.roles }
            },
            (err, roles) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

                for (let i = 0; i < roles.length; i++) {
                    if (roles[i].name === 'support_repair_mod') {
                        next();
                        return;
                    }
                }

                res.status(403).send({ message: 'Require SupportRepairMod Role!' });
                return;
            }
        );
    });
};

isUserAssemblyMod = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        Role.find(
            {
                _id: { $in: user.roles }
            },
            (err, roles) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

                for (let i = 0; i < roles.length; i++) {
                    if (roles[i].name === 'user_assembly_mod') {
                        next();
                        return;
                    }
                }

                res.status(403).send({ message: 'Require UserAssemblyMod Role!' });
                return;
            }
        );
    });
};

isUserItemsMod = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        Role.find(
            {
                _id: { $in: user.roles }
            },
            (err, roles) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

                for (let i = 0; i < roles.length; i++) {
                    if (roles[i].name === 'user_items_mod') {
                        next();
                        return;
                    }
                }

                res.status(403).send({ message: 'Require UserItemsMod Role!' });
                return;
            }
        );
    });
};

isCTOMod = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        Role.find(
            {
                _id: { $in: user.roles }
            },
            (err, roles) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

                for (let i = 0; i < roles.length; i++) {
                    if (roles[i].name === 'cto_mod') {
                        next();
                        return;
                    }
                }

                res.status(403).send({ message: 'Require CTOMod Role!' });
                return;
            }
        );
    });
};

isItemsMod = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }

        Role.find(
            {
                _id: {$in: user.roles}
            },
            (err, roles) => {
                if (err) {
                    res.status(500).send({message: err});
                    return;
                }

                for (let i = 0; i < roles.length; i++) {
                    if (roles[i].name === 'items_mod') {
                        next();
                        return;
                    }
                }

                res.status(403).send({message: 'Require ItemsMod Role'});
                return;
            }
        );
    });
};

isEbankMod = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }

        Role.find(
            {
                _id: {$in: user.roles}
            },
            (err, roles) => {
                if (err) {
                    res.status(500).send({message: err});
                    return;
                }

                for (let i = 0; i < roles.length; i++) {
                    if (roles[i].name === 'e-bank_mod') {
                        next();
                        return;
                    }
                }
                res.status(403).send({message: 'Require EbankMod Role'});
                return;
            }
        );
    });
};

const authJwt = {
    verifyToken, isHRMod, isEDMMod, isToolsMod,
    isAssemblyMod, isBillingMod, isContractsMod, isSupportLiteMod,
    isSupportProMod, isSupportRepairMod, isUserAssemblyMod, isUserItemsMod,
    isCTOMod, isObjectMod, isItemsMod, isEbankMod
};
module.exports = authJwt;