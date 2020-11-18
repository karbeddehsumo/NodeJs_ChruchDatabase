const mongoose = require('mongoose');
const Schema = mongoose.Schema();

const contributionSchema = new Schema({
    churchId: {
        type: String,
        required: [true,'Please enter church ID']
   },
    memberId: {
        type: String,
        required: [true,'Please enter member ID']
    },
    contributionTypeId: {
        type: String,
        required: [true, 'Please enter contribution type ID']
    },
    contributionDate: {
        type: Date,
        required: [true, 'Please enter date']
    },
    amount: {
        type: Number,
        required: [true, 'Please enter amount']
    },
    checkNumber: {
        type: String
    },
    comment: {
        type: String
    },
    enteredBy: {
        type: String,
        required: [true, 'Who entered contribution']
    }

}, {timestamp: true});

const Contribution = mongoose.model('contribution', contributionSchema);
module.exports = Contribution;