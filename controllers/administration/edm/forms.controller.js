exports.allForms = (req, res, next) => {
    res.status(200).send('All Forms');
};

exports.addForm = (req, res, next) => {
    res.status(200).send('Add Form');
};

exports.updateForm = (req, res, next) => {
    res.status(200).send('Update Form');
};

exports.deleteForm = (req, res, next) => {
    res.status(200).send('Delete Form');
};