const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const joi = require('joi');

const expenseSchema = new Schema({
    churchId: joi.string().required(),
    fundId: joi.string().required(),
    statusId: joi.string().required(),
    payee: joi.number().label('Invalid cash amount'),
    amount: joi.number().label('Invalid amount'),
    checkNumber: joi.string(),
    expenseDate:joi.date().default(Date()).label('Enter the income date.'),
    reconcile: joi.boolean().default(false),
    comment: joi.string(),
    enteredBy: joi.string().required()
}, {timestamps: true});

const Expense = mongoose.model('expense', expenseSchema);
module.exports = Expense;
