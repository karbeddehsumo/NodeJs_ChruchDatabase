const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const contributionSchema = new Schema({
    church: { type: Schema.Types.ObjectId, ref: 'church'},
    member: { type: Schema.Types.ObjectId, ref: 'member'},
    contributionType: { type: Schema.Types.ObjectId, ref: 'constant'},
    contributionDate: {
        type: Date,
        default: Date.now,
        required: [true, 'Please enter date']
    },
    amount: {
        type: Number,
        required: [true, 'Please enter amount']
    },
    checkNumber: String,
    comment: String,
    enteredBy: { type: Schema.Types.ObjectId, ref: 'user'},

}, {timestamp: true});

const Contribution = mongoose.model('contribution', contributionSchema);
module.exports = Contribution;