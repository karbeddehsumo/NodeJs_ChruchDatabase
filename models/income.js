const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const incomeSchema = new Schema({
    church: { type: Schema.Types.ObjectId, ref: 'church'},
    fund: { type: Schema.Types.ObjectId, ref: 'constant'},
    status: { type: Schema.Types.ObjectId, ref: 'constant'},
    cashAmount: { type: Number },
    checkAmount: { type: Number },
    coinAmount: { type: Number },
    checkNumber: { type: String },
    date:{
        type: Date, 
        required: [true, 'Please enter the date']
    },
    comment: { type: String },
    enteredBy: { type: Schema.Types.ObjectId, ref: 'user'}
}, {timestamps: true});

const Income = mongoose.model('income', incomeSchema);
module.exports = Income;
