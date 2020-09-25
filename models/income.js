const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const joi = require('joi');

const incomeSchema = new Schema({
    churchId: joi.string().required(),
    fundId: joi.string().required(),
    statusId: joi.string().required(),
    cashAmount: joi.number().label('Invalid cash amount'),
    checkAmount: joi.number().label('Invalid check amount'),
    coinAmount: joi.number().label('Invalid coin amount'),
    checkNumber: joi.string(),
    incomeDate:joi.date().default(Date()).label('Enter the income date.'),
    comment: joi.string(),
    enteredBy: joi.string().required()
}, {timestamps: true});

const Income = mongoose.model('income', incomeSchema);
module.exports = Income;
