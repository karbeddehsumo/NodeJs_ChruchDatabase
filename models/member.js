const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const memberSchema = new Schema({
    church: {type: Schema.Types.ObjectId, ref: 'church'},
    family: {type: Schema.Types.ObjectId, ref: 'family'},
    status: String,
    firstName: {
        type: String,
        required: [true, 'Please enter first name']
    },
    lastName: {
        type: String,
        required: [true, 'Please enter last name']
    },
    middleName: String,
    dob: {type:Date, default: Date.Now},
    gender: {
        type: String,
        required: [true, 'Please enter gender']
    },
    Phone: String,
    email: String,
    membershipDate: {type: Date, default: Date.now },
    title: String,
    roles: [String],
    contactType: String,
    contributions: [{ type: Schema.Types.ObjectId, ref: 'contribution'}],
    enteredBy: { type: Schema.Types.ObjectId, ref: 'user'}
}, {timestamps: true});

const Member = mongoose.model('member', memberSchema);
module.exports = Member;
