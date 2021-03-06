const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const expenseSchema = new Schema({
    church: { type: Schema.Types.ObjectId, ref: 'church'},
    fund: { type: Schema.Types.ObjectId, ref: 'fund'},
    statusId: { type: Schema.Types.ObjectId, ref: 'constant'},
    payee: String,
    amount: {
        type: Number,
        required: [true, 'Please enter amount']
    },
    checkNumber: String,
    expenseDate:{
        type: Date,
        required: [true, 'Please enter the date']
    },
    reconcile: Boolean,
    comment: String,
    enteredBy: { type: Schema.Types.ObjectId, ref: 'user'}
}, {timestamps: true});

const Expense = mongoose.model('expense', expenseSchema);
module.exports = Expense;
