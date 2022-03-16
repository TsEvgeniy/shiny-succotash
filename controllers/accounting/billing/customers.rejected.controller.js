exports.allRejected = (req, res, next) => {
    res.status(200).send('All Rejected');
};

exports.addRejected = (req, res, next) => {
    res.status(200).send('Add Rejected');
};

exports.updateRejected = (req, res, next) => {
    res.status(200).send('Update Rejected');
};

exports.deleteRejected = (req, res, next) => {
    res.status(200).send('Delete Rejected');
};
