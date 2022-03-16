
exports.allObjects = (req, res, next) => {
    res.status(200).send('Objects Board! (GET)');
};

exports.addObject = (req, res, next) => {
    res.status(200).send('Add Object!');
};

exports.updateObject = (req, res, next) => {
    res.status(200).send('Update Object!');
};

exports.deleteObject = (req, res, next) => {
    res.status(200).send('Delete Object!');
};

