const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const memberSchema = new Schema({
    churchId: {type: String},
    familyId: {type: String},
    statusId: {type: String},
    firstName: {
        type: String,
        required: [true, 'Please enter first name']
    },
    lastName: {
        type: String,
        required: [true, 'Please enter last name']
    },
    middleName: {type: String},
    dob: {type: Date},
    gender: {
        type: String,
        required: [true, 'Please enter gender']
    },
    Phone: {type: String},
    email: {type: String},
    membershipDate: {type: Date},
    title: {type: String},
    roles: [String],
    contactType: {type: String},
    enteredBy: {type: String},
}, {timestamps: true});

const Member = mongoose.model('member', memberSchema);
module.exports = Member;
