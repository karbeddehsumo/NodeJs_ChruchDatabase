const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const memberSchema = new Schema({
    church: {type: Schema.Types.ObjectId, ref: 'church'},
    family: {type: Schema.Types.ObjectId, ref: 'family'},
    status: {type: String},
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
    contributions: [{ type: Schema.Types.ObjectId, ref: 'contribution'}],
    enteredBy: {type: String},
}, {timestamps: true});

const Member = mongoose.model('member', memberSchema);
module.exports = Member;
