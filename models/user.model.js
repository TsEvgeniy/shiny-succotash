const mongoose = require('mongoose');

const User = mongoose.model(
    'User',
    new mongoose.Schema({
        username: String,
        surName: String,
        middleName: String,
        series: String,
        passportNumber: Number,
        givenPlace: String,
        givenDate: Number,
        birthDate: Number,
        birthPlace: String,
        inhabitationPlace: String,
        education: String,
        // seriesOfDiploma: String,
        levelOfEducation: String,
        numberOfDiploma: String,
        tin: Number,
        pinfl: String,
        cardNumber: Number,
        corpTelNumber: Number,
        social: String,
        telegramId: String,
        gmail: String,
        zoomId: String,
        weChatId: String,
        email: String,
        password: String,
        department: String,
        phoneNumber: Number,
        position: String,
        roles: [{type: mongoose.Schema.Types.ObjectId, ref: 'Role'}]
    })
);

module.exports = User;


/*
username
surName
middleName
series
passportNumber
givenPlace
givenDate
birthDate
birthPlace
inhabitationPlace
education
seriesOfDiploma
levelOfEducation
numberOfDiploma
tin
pinfl
cardNumber
corpTelNumber
social
telegramId
gmail
zoomId
weChatId
email
password
department
phoneNumber
position
*/