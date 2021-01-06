const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const incomeSchema = new Schema({
    church: { type: Schema.Types.ObjectId, ref: 'church'},
    fund: { type: Schema.Types.ObjectId, ref: 'constant'},
    status: { type: Schema.Types.ObjectId, ref: 'constant'},
    cashAmount: Number,
    checkAmount: Number,
    coinAmount: Number,
    checkNumber: Number,
    date:{
        type: Date, 
        default: Date.now,
        required: [true, 'Please enter the date']
    },
    comment: String,
    enteredBy: { type: Schema.Types.ObjectId, ref: 'user'}
}, {timestamps: true});

const Income = mongoose.model('income', incomeSchema);
module.exports = Income;
