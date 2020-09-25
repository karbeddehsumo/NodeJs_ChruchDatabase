const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const joi = require('joi');

const memberSchema = new Schema({
    churchId: joi.string().required(),
    familyId: joi.string().required().label('Enter the family'),
    statusId: joi.string().required().label('Enter the status'),
    firstName: joi.number().label('Invalid check amount'),
    lastName: joi.number().label('Invalid coin amount'),
    middleName: joi.string(),
    dob: joi.date().default(Date()).label('Enter the date of birth.'),
    gender: joi.string().required().label('Enter the gender.'),
    Phone: joi.string().regex(/^(\(\d{3}\) |\d{3}-)\d{3}-\d{4}$/).default('111-222-3333'),
    email: joi.string().email().lowercase(),
    membershipDate: joi.string(),
    title: joi.string(),
    contactType: joi.string(),
    enteredBy: joi.string().required()
}, {timestamps: true});

const Member = mongoose.model('member', memberSchema);
module.exports = Member;
