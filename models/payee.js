const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const payeeSchema = new Schema({
    church: { type: Schema.Types.ObjectId, ref: 'church'},  
    fund: { type: Schema.Types.ObjectId, ref: 'fund'},
    payee: String,
    phone: String,
    email: String,
    url: String,
    frequency: { type: Schema.Types.ObjectId, ref: 'constant'},
    description: String,
    payeeType: String,
    status: String,
    enteredBy: { type: Schema.Types.ObjectId, ref: 'user'}
}, { timestamps: true});

const Payee = mongoose.model('payee', payeeSchema);
module.exports = Payee;