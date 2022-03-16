exports.allCurrentAccounts = (req, res, next) => {
    res.status(200).send('All CurrentAccounts');
};

exports.addCurrentAccount = (req, res, next) => {
    res.status(200).send('Add CurrentAccount');
};

exports.updateCurrentAccount = (req, res, next) => {
    res.status(200).send('Update CurrentAccount');
};

exports.deleteCurrentAccount = (req, res, next) => {
    res.status(200).send('Delete CurrentAccount');
};