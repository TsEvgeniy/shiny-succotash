exports.allCalendar = (req, res, next) => {
    res.status(200).send('All Calendar');
};

exports.addCalendar = (req, res, next) => {
    res.status(200).send('Add Calendar');
};

exports.updateCalendar = (req, res, next) => {
    res.status(200).send('Update Calendar');
};

exports.deleteCalendar = (req, res, next) => {
    res.status(200).send('Delete Calendar');
};